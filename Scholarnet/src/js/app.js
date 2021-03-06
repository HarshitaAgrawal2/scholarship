$(function() {
    $(window).load(function() {
        App.init();
    });
});

App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
  
    init: function() {
        return App.initWeb3();
    },
  
    initWeb3: function() {
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } 
        else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },
  
    initContract: function() {
        $.getJSON("Student.json", function(Student) {
            // Instantiate a new truffle contract from the artifact
            App.contracts.Student = TruffleContract(Student);
            // Connect provider to interact with contract
            App.contracts.Student.setProvider(App.web3Provider);
        });
    },

    showStudentInfo: function() {
        App.contracts.Student.deployed().then((student) =>{
            var aadhaar = $("#aadhaarNo").val();
            student.getName(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>Applicant Name:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });

            student.getId(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>Applicant ID:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });

            
            student.getDob(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>Date of birth:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });

            student.getSSC(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>SSC percentage:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });

            student.getHSC(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>HSC percentage:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });
            
            student.getEducation(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>Current Education:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });

            student.getcurYear(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>Current education year:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });

            student.getAadhaar(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>Applicant's Aadhaar card number:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });

            student.getIncome(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>Family Income:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });

            student.getsDetails(aadhaar).then((result, error)=>{
                console.log(result);
                $("#details").append("<div class='key'>Other Scholarship details:</div><div class='value'>"+result+"</div><br>");
                console.log(error);
            });
        }); 
    },

    validateStudentInfo: function(s){
        console.log("Validate");
       // var num = $("#certi_num").val();  //father_adhaar is replaced by income certificate but naming conventions are not changed
        var fi = $("#income").val(); //entered income
        var original_income = s;   //retrieve income whoose income certificate number is equal to num
        
        App.contracts.Student.deployed().then((student)=>{
            student.validateIncome(fi,original_income).then((result,error)=>{
                console.log(result);
                console.log(error);
                if(error){
                    console.log("error") ;
                }
                if(result=="valid"){
                    $("#incomeValid").text("");
                    App.setStudentInfo();
                }
                else if(result=="invalid"){
                    $("#incomeValid").text("");
                    $("#incomeValid").append("<br>Income entered does not matches with Income department logs.");
                }
            });
        });
    },

    setStudentInfo: function() {
        App.contracts.Student.deployed().then((student) =>{
            var name = $("#name").val();
            var ten = $("#ssc_per").val();
            var tw = $("#hsc_per").val();
            var aadhaar = $("#aadhaar").val();
            var dob = $("#dob").val();
            var fi = $("#income").val();
            var edu = $("#edu").val();
            var yearedu = $("#year_edu").val();
            //var sgot = $("#scholarship_got").val();
            var sd = $("#scholarship_info").val();
            var flag = "true";
            $("#aadhaarValid").text("");
            if(!(/^\d{4}\d{4}\d{4}$/.test(aadhaar))){

                console.log("nope");
                var aadhaarmsg = "<br>Enter valid Aadhaar number";
                flag="false";
                $("#aadhaarValid").append(aadhaarmsg);
            }
            else{
                $("#aadhaarValid").text("");
            }
            if(flag=="true"){ //if all information entered in form are proper and gets validated.
                student._setStudentInfo(name,ten,tw,aadhaar,dob,fi,edu,yearedu,sd);
            }
        });
    },
};
  
  
