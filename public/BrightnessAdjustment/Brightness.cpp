#include <iostream>
#include <memory>
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/video/video.hpp>
#include <string>
#include <boost/filesystem.hpp>

using namespace cv;
using namespace std;
using namespace boost::filesystem;
class Brightness {
	public:
		bool gain(float dist, string input_file_path, string output_path);
};

bool Brightness::gain(float dist, string input_file_path, string output_path){

	//========================================================
	//split audio track from video using ffmpeg
	string temp_video_name = to_string(time(0)).append(".mp4");
	string temp_audio_name = to_string(time(0)).append(".mp3");

	string split_audio_command = "ffmpeg -hide_banner -loglevel 0 -i ";
	split_audio_command.append(input_file_path);
	split_audio_command.append(" -q:a 0 -map a ");
	split_audio_command.append(temp_audio_name);

	system(split_audio_command.c_str());

	//========================================================
	//create video capture and video writer
	VideoCapture capture;
	VideoWriter outputVideo;

	int fourcc = CV_FOURCC('X', '2', '6', '4');

	capture.set(CV_CAP_PROP_FOURCC, fourcc);
	capture.open(input_file_path.c_str());

	double fps = capture.get(CV_CAP_PROP_FPS);
	int width = capture.get(CV_CAP_PROP_FRAME_WIDTH);
	int height = capture.get(CV_CAP_PROP_FRAME_HEIGHT);
	Size s = Size(width, height);

	outputVideo.open(temp_video_name.c_str(), fourcc, fps, s);

	if (!capture.isOpened()) {
		cout << "Cannot open video device or file!" << endl;
		return -1;
	}

	//========================================================
	//Initialize data structure
	Mat *frame;
	Mat *result;

	frame = (Mat *)malloc(width * height * 3);
	result = (Mat *)malloc(width * height * 3);
	
	//========================================================
	//start processing brightness gain
	bool hasnextframe = true;
	cout << "Reading Frame start" << endl;
	while (hasnextframe) {

		//Read frames
		capture >> *frame;

		//create zero result matrix
		*result = Mat::zeros(frame->size(), frame->type());

		//shift value in all frame matrix by rgb
		*result = *frame + Scalar(-dist, -dist, -dist);

		//save to output video
		outputVideo << *result;


		if (frame->empty()) {
			cout << "No frame read" << endl;
			hasnextframe = false;
		}
	}

	//========================================================
	//release and free memory
	free(frame);
	free(result);
	outputVideo.release();

	//========================================================
	//merge audio track using ffmpeg
	string input_file_name = path(input_file_path).filename().string();
	string merge_audio_command = "ffmpeg -hide_banner -loglevel 0 -y -i ";
	merge_audio_command.append(temp_video_name);
	merge_audio_command.append(" -i ");
	merge_audio_command.append(temp_audio_name);
	merge_audio_command.append(" -shortest ");
	merge_audio_command.append(output_path);
	merge_audio_command.append(input_file_name);
	system(merge_audio_command.c_str());

	//========================================================
	//remove temporary tracks
    remove(temp_audio_name.c_str());
    remove(temp_video_name.c_str());
	return true;
}