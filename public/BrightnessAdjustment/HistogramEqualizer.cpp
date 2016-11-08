#include <iostream>
#include <memory>
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/video/video.hpp>
#include <string>

using namespace cv;
using namespace std;

int main(int argc, char *argv[]) {
	if (argc < 3) {
		cout << "Arguments Not acceptable" << endl;
		exit(0);
	}

	VideoCapture capture;
	VideoWriter outputVideo;

	int fourcc = CV_FOURCC('X', '2', '6', '4');

	capture.set(CV_CAP_PROP_FOURCC, fourcc);

	capture.open(argv[1]);

	string temp_video_name = to_string(time(0)).append(".mp4");
	string temp_audio_name = to_string(time(0)).append(".mp3");

	string split_audio_command = "ffmpeg -i ";
	split_audio_command.append(argv[1]);
	split_audio_command.append(" -q:a 0 -map a ");
	split_audio_command.append(temp_audio_name);

	system(split_audio_command.c_str());

	double fps = capture.get(CV_CAP_PROP_FPS);
	int width = capture.get(CV_CAP_PROP_FRAME_WIDTH);
	int height = capture.get(CV_CAP_PROP_FRAME_HEIGHT);
	Size s = Size(width, height);

	outputVideo.open(temp_video_name.c_str(), fourcc, fps, s);

	if (!capture.isOpened()) {
		cout << "Cannot open video device or file!" << endl;
		return -1;
	}

	Mat *frame;
	Mat *frame_hist_equalized;
	vector<Mat> channels;

	frame = (Mat *)malloc(width * height * 3);
	frame_hist_equalized = (Mat *)malloc(width * height * 3);

	bool hasnextframe = true;

	cout << "processing" << endl;
	while (hasnextframe) {

		capture >> *frame;

		cvtColor(*frame, *frame_hist_equalized, CV_BGR2YCrCb);

		split(*frame_hist_equalized, channels);


		equalizeHist(channels[0], channels[0]);

		if (!channels.empty()) {
			merge(&channels[0], channels.size(), *frame_hist_equalized);
			cvtColor(*frame_hist_equalized, *frame_hist_equalized, CV_YCrCb2BGR);
			outputVideo << *frame_hist_equalized;
		} else {
			outputVideo << *frame;
		}
		if (frame->empty()) {
			cout << "no frame read" << endl;
			hasnextframe = false;
		}
	}

	free(frame);
	free(frame_hist_equalized);

	outputVideo.release();

	string merge_audio_command = "ffmpeg -y -i ";
	merge_audio_command.append(temp_video_name);
	merge_audio_command.append(" -i ");
	merge_audio_command.append(temp_audio_name);
	merge_audio_command.append(" -shortest ");
	merge_audio_command.append(argv[2]);

	cout<< merge_audio_command<<endl;

	system(merge_audio_command.c_str());

    remove(temp_audio_name.c_str());
    remove(temp_video_name.c_str());
	return 0;
}
