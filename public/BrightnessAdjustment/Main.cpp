#include <iostream>
#include <vector>
#include <string>
#include <opencv2/core/core.hpp>
#include <opencv2/opencv.hpp>
#include "MakeSample.h"
#include "Brightness.h"


using namespace std;
using namespace cv;
int main(int argc, char *argv[]) {
	if (argc < 3) {
		cout << "Arguments Not acceptable" << endl;
		exit(0);
	}

	MakeSample makeSample;
	Brightness brightness;

	string output_path = argv[1];
	if (output_path.back()!= '/' && output_path.back()!='\\'){
		output_path.append("/");
	}


	//get all file names
	vector<string> file_list;
	for (int i=2; i<argc; i++) {
		file_list.push_back(argv[i]);
	}

	//get all file brightness means
	vector<float> means;
	for (int i=0; i<file_list.size(); i++) {

		//10 is the number of samples for each video
		//samples will be unifomly generated from origin sources
		float sample_mean = makeSample.getMean(10, file_list[i]);
		means.push_back(sample_mean);
		
	}

	//calculate overall means of all videos
	float total_mean = mean(means)[0];

	for (int i=0;i<file_list.size();i++){
		
		//calculate distance of all videos and gain brightness of each
		float dist = means[i] - total_mean;
		if (brightness.gain(dist, file_list[i], output_path)){
			cout << "True" << endl;
		} else {
			cout << "False" << endl;
		}
	}

	return 0;
}