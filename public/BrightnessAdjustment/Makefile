#cv3 link, lib and include start#
LDFLAGS := -L"/usr/local/opt/opencv3/lib/"
CPPFLAGS := -I"/usr/local/opt/opencv3/include/"
LDLIBS := -lopencv_core -lopencv_highgui -lopencv_video -lopencv_videoio -lopencv_imgproc -lopencv_imgcodecs -lboost_system -lboost_filesystem
#cv3 link, lib and include end#

#cv2 link#
LDLIBS_CV2 := -lopencv_core -lopencv_highgui -lopencv_video -lopencv_imgproc

all:
	g++ HistogramEqualizer.cpp $(LDFLAGS) $(CPPFLAGS) $(LDLIBS) -o HistogramEqualizer -std=c++11
	g++ Brightness.cpp MakeSamples.cpp Main.cpp $(LDFLAGS) $(CPPFLAGS) $(LDLIBS) -o Main -std=c++11
#g++ MakeSamples.cpp $(LDFLAGS) $(CPPFLAGS) $(LDLIBS) -o MakeSamples -std=c++11
# g++ main2.cpp $(LDFLAGS) $(CPPFLAGS) $(LDLIBS) -o main2 -std=c++11

cv2:
	g++ main.cpp $(LDLIBS_CV2) -o main -std=c++11
	g++ main2.cpp $(LDLIBS_CV2) -o main2 -std=c++11

clean:
	rm HistogramEqualizer Main
