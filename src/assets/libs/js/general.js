$(function () {

    //cosultaMarcas('cmb_marca2');
});

/** */

var externalObject = (function () {

    return {
        provi: function (id) {
            cosultaProvincia(id);
        },
        setProvi: function (id) {

            $("#cmb_provincia").val(id);
            setTimeout(function () { $("#cmb_provincia").val(id); }, 1000);
        },
        ciudad: function (id) {
            consultaCiudad(id);
        },
        setCiu: function (id) {
            //alert('ciudad=>' + id);

            $("#cmb_ciudad").val(id);
            setTimeout(function () { $("#cmb_ciudad").val(id); }, 1000);
        },
        localidad: function (id) {
            consultaLocalidad(id);
        }, setLoca: function (id) {

            $("#cmb_localidad").val(id);
            setTimeout(function () { $("#cmb_localidad").val(id); }, 1000);
        }, setTipo: function (id) {

            $("#cmb_idTipo").val(id);
            setTimeout(function () { $("#cmb_idTipo").val(id); }, 1000);
        }, setConcepto: function (val) {
            $("#cmb_concepto").val(val);
            setTimeout(function () { $("#cmb_concepto").val(val); }, 1000);
        }, setMarcas: function(val,tipo){
            cosultaMarcas(val,tipo);
        }
    }

})(externalObject || {})
/**acciones combo */
function cosultaPais() {

    var urlRest = "http://157.245.177.172/Repository2/backController/";
    $("#cmb_provincia").empty();
    var row = "";
    row = row + "<option value='-' ></option>";
    $.ajax({
        url: urlRest + "consultaLocation",
        type: "POST",
        dataType: "json",
        data: "tipo=P&padre=" + null,
        success: function (result) {
            if (eval(result)) {
                $.each(result, function (i, dato) {
                    row = row + "<option value='" + dato.id + "' >" + dato.descripcion + "</option>";
                });
                $("#cmb_provincia").append(row);
            }
        }
    });

}

function cosultaProvincia(paisId) {
    if (paisId != '') {
        var urlRest = "http://157.245.177.172/Repository2/backController/";
        $("#cmb_provincia").empty();
        var row = "";
        row = row + "<option value='-' ></option>";
        $.ajax({
            url: urlRest + "consultaLocation",
            type: "POST",
            dataType: "json",
            data: "tipo=PR&padre=" + paisId,
            success: function (result) {
                if (eval(result)) {
                    $.each(result, function (i, dato) {
                        row = row + "<option value='" + dato.id + "' >" + dato.descripcion + "</option>";
                    });
                    $("#cmb_provincia").append(row);
                }
            }
        });
    }
}

function consultaCiudad(provId) {
    if (provId != '') {
        var urlRest = "http://157.245.177.172/Repository2/backController/";
        $("#cmb_ciudad").empty();
        var row = "";
        row = row + "<option value='-' ></option>";
        $.ajax({
            url: urlRest + "consultaLocation",
            type: "POST",
            dataType: "json",
            data: "tipo=CIU&padre=" + provId,
            success: function (result) {
                if (eval(result)) {
                    $.each(result, function (i, dato) {
                        row = row + "<option value='" + dato.id + "' >" + dato.descripcion + "</option>";
                    });
                    $("#cmb_ciudad").append(row);
                }
            }
        });
    }
}

function consultaLocalidad(ciuId) {
    if (ciuId != '') {
        var urlRest = "http://157.245.177.172/Repository2/backController/";
        var row = "";
        $("#cmb_localidad").empty();
        row = row + "<option value='-' ></option>";
        $.ajax({
            url: urlRest + "consultaLocation",
            type: "POST",
            dataType: "json",
            data: "tipo=LO&padre=" + ciuId,
            success: function (result) {
                if (eval(result)) {
                    $.each(result, function (i, dato) {
                        row = row + "<option value='" + dato.id + "' >" + dato.descripcion + "</option>";
                    });
                    $("#cmb_localidad").append(row);
                }
            }
        });
    }
}

function cosultaMarcas(name,tipo) {

    var urlRest = "http://157.245.177.172/Repository2/backController/";
    var empresa = localStorage.getItem("id_empresa");
    $("#" + name).empty();
    var row = "";
    row = row + "<option value='-' ></option>";
    $.ajax({
        url: urlRest + "consultarMarcaEquipos",
        type: "POST",
        dataType: "json",
        data:"tipo="+tipo+"&empresa="+empresa,
        success: function (result) {
            if (eval(result)) {
                $.each(result, function (i, dato) {
                    row = row + "<option value='" + dato.id_marca + "' >" + dato.nombre + "</option>";
                });
                $("#" + name).append(row);

            }
        }
    });

}

function buscarModelos(name,valor){
    var urlRest = "http://157.245.177.172/Repository2/backController/";
    $("#" + name).empty();
    var row = "";
    row = row + "<option value='-' ></option>";
    $.ajax({
        url: urlRest + "consultarModeloEquipos",
        type: "POST",
        dataType: "json",
        data: "id_marca="+valor,
        success: function (result) {
            if (eval(result)) {
                $.each(result, function (i, dato) {
                    row = row + "<option value='" + dato.id_modelo + "' >" + dato.nombre + "</option>";
                });
                $("#" + name).append(row);

            }
        }
    });
}

function buscarEquipos(name,valor,tipo){
    var urlRest = "http://157.245.177.172/Repository2/backController/";
    var empresa = localStorage.getItem("id_empresa");
    $("#" + name).empty();
    var row = "";
    row = row + "<option value='-' ></option>";
    $.ajax({
        url: urlRest + "consultarEquipos",
        type: "POST",
        dataType: "json",
        data: "id_modelo="+valor+"&tipo="+tipo+"&empresa="+empresa,
        success: function (result) {
            if (eval(result)) {
                $.each(result, function (i, dato) {
                    row = row + "<option value='" + dato.id + "' >" + dato.descripcion + "</option>";
                });
                $("#" + name).append(row);

            }
        }
    });
}
/**validaciones */