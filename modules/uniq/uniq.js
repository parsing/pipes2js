
exports.worker = function (task, config) {

    var input = JSON.parse(task.config.input);

    var uniq_field = input.field.value;

    var results = [];
    var itemsByValue = {};

    for(var i = 0 ; i < input._INPUT.length; i++) {
        var val = input._INPUT[i][uniq_field];

        if(!itemsByValue[val]) {
            input._INPUT[i]["y:repeatcount"] = 1;
            results.push(input._INPUT[i]);
            itemsByValue[val] = input._INPUT[i];
        }
        else {
            itemsByValue[val]["y:repeatcount"] += 1;
        }
    }

    task.respondCompleted({
        _OUTPUT: results
    });

};
