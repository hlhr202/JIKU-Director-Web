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

class MakeSample{
	public:
		float getMean(int sample_number, string input_file_name);
		//input: number of sample (currently set to 10) and file name
};

float MakeSample::getMean(int sample_number, string input_file_name) {

	//========================================================
	//create video capture
	VideoCapture capture;
	int fourcc = CV_FOURCC('X', '2', '6', '4');

	capture.set(CV_CAP_PROP_FOURCC, fourcc);
	capture.open(input_file_name.c_str());

	int width = capture.get(CV_CAP_PROP_FRAME_WIDTH);
	int height = capture.get(CV_CAP_PROP_FRAME_HEIGHT);
	int total_frame = capture.get(CV_CAP_PROP_FRAME_COUNT);

	if (!capture.isOpened()) {
		cout << "Cannot open video device or file!" << endl;
		return -1;
	}

	//========================================================
	//Initialize data structure
	Mat *frame;
	vector<Mat> channels;
	float total_mean;
	
	if (total_frame<sample_number) {
		cout<<"Sample too small"<<endl;
		return 0.f;
	}

	//========================================================
	//start estimating means of brightness of video
	else {
		frame = (Mat *)malloc(width * height * 3);
		for (int i=0;i<sample_number;i++){

			//get next sample
			int next_to_sample = i*(total_frame/sample_number)+1;
			capture.set(CV_CAP_PROP_POS_FRAMES, next_to_sample);
			capture >> *frame;
			
			//convert sample from RGB to YCrCb
			cvtColor(*frame, *frame, CV_BGR2YCrCb);

			//split YCrCb channels
			split(*frame, channels);

			//calculate mean from Y channel (luminosity channel)
			total_mean += mean(channels[0])[0];
		}

		//free memory
		free(frame);

		//return mean of total
		float mean = total_mean / sample_number;
		return mean;
	}
}