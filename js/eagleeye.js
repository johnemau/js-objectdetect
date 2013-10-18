EagleEye = function(dataSource, detectors, detectorMaps){
    var isFinding = false,
        numDetectors = detectors.length,
        defaultOptions = {
        scaleMin: 1,
        scaleFactor: 1.25
    };

    this.detect = function(options, callback) {
        if (!isFinding) {
            var returned = 0,
                data = [];
            isFinding = true;
            options = _.defaults(options, defaultOptions);

            for (index in detectors) {
                var scaledOptions = {
                        scaleMin: options.scaleMin * detectorMaps[detectors[index]],
                        scaleFactor: Math.pow(options.scaleFactor, 1/detectorMaps[detectors[index]])
                    };

                scaledOptions.classifier = objectdetect[detectors[index]];

                $(dataSource).objectdetect('all', scaledOptions, function(coordArray) {
                    data = _.union(data, _.map(coordArray, function(coord) {
                        return {
                            type: detectors[index],
                            data: coord
                        }
                    }));
                    returned++;
                    if (returned === numDetectors) {
                        callback.call({}, data);
                        isFinding = false;
                    }
                })
            }
        }
    }
};