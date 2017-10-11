function solve(cnf, element) {
    var cnf_data = {
        'cnf': cnf
    };

    $.post( "/solve", { cnf: cnf}, function(data) {
        console.log(data);
    });

    var result_recived = false;
    var interval;
    // STARTS and Resets the loop if any

    var result;
    function startLoop() {
        interval = setInterval( function() {
            $.get("/solve_result", function(data) {
                console.log(data);
                result = data;
            });
            if (result != 'Nothing to get.') {
                result = JSON.parse(result.slice(0, -1));
                result = result['RESPONSE']['FINISHED'];
                var success = result['SUCCESSFUL'];
                console.log(success);
                if (success) {
                    result_recived = true;
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
                    result_recived = true;
                    element.children('.time').text('No soloution could be found. :(');
                    element.children('.answer').html('');
                    element.slideDown("slow");
                }
            }
            if(result_recived) clearInterval(interval);
        }, 150 );  // run
    }

    startLoop();

}

function solve1() {
    solve({"raw_input":['p cnf 4 2', '4 1 -3 0', '4 2 -3 0']}, $('#problem1'));
}

function solve2() {
    solve({"raw_input":['p cnf 4 4','4 1 0', '2 0', '3 0', '3 -1 0']}, $('#problem2'));
}

function solve3() {
    var answer = solve({"raw_input":['p cnf 4 5', '1 0', '-1 0', '2 0', '3 0', '4 0']}, $('#problem3'))
}

function BitStringToBoolean(bitString) {
    var temp = bitString.replace(/1/g, 'TRUE ');
    temp = temp.replace(/0/g, 'FALSE ');
    return temp.slice(0, -1).split(' ');
}