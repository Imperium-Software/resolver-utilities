function solve(cnf, element, playground) {
    var cnf_data = {
        'cnf': cnf
    };

    var continue_to_get = true;
    $.post( "/solve", { cnf: cnf}, function(data) {
        console.log(data);
        if (data != 'Thanks, going to solve it in a jiffy!') {
            element.children('.time').html('');
            element.children('.answer').html(data);
            element.slideDown("slow");
            continue_to_get = false;
        }

        if (!continue_to_get) {
            return;
        }
    
        var result_recived = false;
        var interval;
        // STARTS and Resets the loop if any
    
        function startLoop() {
            var result = 'Nothing to get.';
            interval = setInterval( function() {
                $.get("/solve_result", function(data) {
                    console.log(data);
                    result = data;
                });
    
                try {
                    if (result != 'Nothing to get.') {
                        result_recived = true;
                        result = JSON.parse(result.slice(0, -1));
                        result = result['RESPONSE']['FINISHED'];
                        var success = result['SUCCESSFUL'];
                        result_recived = true;
                        if (success) {
                            if (playground) {
                                var time = result['TIME_FINISHED'] - result['TIME_STARTED'];
                                var answer = result['INDIVIDUAL'];
                                element.children('.time').text('Successfully found a solution in ' + time + 'ms');
                                var values = BitStringToBoolean(answer);
                                element.children('.answer').children('.a').html(values[0]);
                                element.children('.answer').children('.b').html(values[1]);
                                element.children('.answer').children('.c').html(values[2]);
                                element.children('.answer').children('.d').html(values[3]);
                                element.slideDown("slow");
                            } else {
                                var time = result['TIME_FINISHED'] - result['TIME_STARTED'];
                                var answer = result['INDIVIDUAL'];
                                element.children('.time').text('Successfully found a solution in ' + time + 'ms');
                                element.children('.answer').html('<b>A</b> solution: ' + answer);
                                element.slideDown("slow");
                            }
                        } else {
                            element.children('.time').text('No soloution could be found. :(');
                            element.children('.answer').html('');
                            element.slideDown("slow");
                        }
                    }
                } catch(e) {
                    element.children('.time').html('');
                    element.children('.answer').html('Something is wrong with your CNF.');
                    element.slideDown("slow");
                }
                if(result_recived) clearInterval(interval);
            }, 150 );  // run
        }
    
        startLoop();

    });

}

function solve1() {
    solve({"raw_input":['p cnf 4 2', '4 1 -3 0', '4 2 -3 0']}, $('#problem1'), true);
}

function solve2() {
    solve({"raw_input":['p cnf 4 4','4 1 0', '2 0', '3 0', '3 -1 0']}, $('#problem2'), true);
}

function solve3() {
    solve({"raw_input":['p cnf 4 5', '1 0', '-1 0', '2 0', '3 0', '4 0']}, $('#problem3'), true)
}

function solve_custom() {
    var raw_input = $('#cnf-textarea').val();
    raw_input = raw_input.split('\n');
    solve({"raw_input":raw_input}, $('#response'), false)
}

function BitStringToBoolean(bitString) {
    var temp = bitString.replace(/1/g, 'TRUE ');
    temp = temp.replace(/0/g, 'FALSE ');
    return temp.slice(0, -1).split(' ');
}

$(document).ready(function() {
    $('#cnf-textarea').val('p cnf 4 2\n4 1 -3 0\n4 2 -3 0');
});