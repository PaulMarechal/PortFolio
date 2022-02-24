$(window).on("load", function () {
    $("#informations").modal("show");
});

$(document).ready(function() {
                $('button.btn-view-details-3').on('click', function() {
                $('#point3').modal('show');
                })
            })
                            
            $(document).ready(function() {
                $('button.btn-view-details-2').on('click', function() {
                $('#point0').modal('show');
                })
            })
                            
            $(document).ready(function() {
                $('button.btn-view-details-1').on('click', function() {
                $('#point2').modal('show');
                })
            })
                            
            $(document).ready(function() {
                $('button.btn-view-details-0').on('click', function() {
                $('#point1').modal('show');
                })
            })
            
            $(function () {
                $('#modal').modal('toggle');
            });

function closeAlertBox() {
    alertBox = document.getElementById("alertBox");
    alertClose = document.getElementById("alertClose");
    alertBox.style.visibility = "hidden";
    alertClose.style.visibility = "hidden";
}
window.alert = function (msg) {
    var id = "alertBox",
    alertBox,
    closeId = "alertClose",
    alertClose;
    alertBox = document.createElement("div");
    document.body.appendChild(alertBox);
    alertBox.id = id;
    alertBox.innerHTML = msg;
    alertClose = document.createElement("div");
    alertClose.id = closeId;
    alertClose.innerHTML = "x";
    alertBox.appendChild(alertClose);
    alertBox.style.visibility = "visible";
    alertClose.style.visibility = "visible";
    alertClose.onclick = closeAlertBox; 
};


