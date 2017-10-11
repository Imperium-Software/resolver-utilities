function solve(cnf) {
    var cnf_data = {
        'cnf': cnf
    };

    $.ajax({
        type        : 'POST',
        url         : 'http://localhost:3000',
        data        : cnf_data,
        dataType    : 'jsonp',
        encode      : true,
        crossDomain : true
    }).done(function(data) {
        console.log(data);
    });
}

function solve1() {
    var answer = solve({"raw_input":['p cnf 4 2', '4 1 -3 0', '4 2 -3 0']});
}

function solve2() {
    var answer = solve("p cnf 4 4\n4 1 0\n2 0\n3 0\n3 -1 0");
}

function solve3() {
    var answer = solve("p cnf 4 5\n1 0\n-1 0\n2 0\n3 0\n4 0")
}