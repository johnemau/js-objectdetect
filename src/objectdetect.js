EagleEye = function(dataSource, detectors){
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
                var specificOptions = _.defaults({
                    classifier: objectdetect[detectors[index]]
                }, options);

                $(dataSource).objectdetect('all', specificOptions, function(coordArray) {
                    data = _.union(data, _.map(coordArray, function(coord) {
                        return {
                            type: detectors[index],
                            data: coord
                        }
                    }));
                    returned++;
                    if (returned === numDetectors) {
                        console.log(data);
                        callback.call({}, data);
                        isFinding = false;
                    }
                })
            }
        }
    }
};