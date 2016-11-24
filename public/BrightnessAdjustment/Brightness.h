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

class Brightness {
	public:
		bool gain(float gain, string input_file_path, string output_path);
};