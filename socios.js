//Aqui se hara la configuracion para poder consumir y usar la parte dejquery y poder utilizar 
//el metodo get html
var UrlGetSocios = 'http://localhost:80/G4_19/controller/socios_negocio.php?op=GetSocios_negocio';
var UrlPostSocios = 'http://localhost:80/G4_19/controller/Socios_negocio.php?op=InsertSocio_negocio';
var UrlDeleteSocios = 'http://localhost:80/G4_19/controller/Socios_negocio.php?op=DeleteSocio_negocio';
var UrlGetUno = 'http://localhost:80/G4_19/controller/Socios_negocio.php?op=GetUno';
var UrlPutsocios = 'http://localhost:80/G4_19/controller/Socios_negocio.php?op=UpdateSocio_negocio';


$(document).ready(function () {
    CargarSocios();
});

function CargarSocios() {
    $.ajax({
        url: UrlGetSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].NOMBRE + '</td>' +
                    '<td>' + MiItems[i].RAZON_SOCIAL + '</td>' +
                    '<td>' + MiItems[i].DIRECCION + '</td>' +
                    '<td>' + MiItems[i].TIPO_SOCIO + '</td>' +
                    '<td>' + MiItems[i].CONTACTO + '</td>' +
                    '<td>' + MiItems[i].EMAIL + '</td>' +
                    '<td>' + MiItems[i].FECHA_CREADO + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' + MiItems[i].TELEFONO + '</td>' +
                    '<td>' +
                    '<button class="btn btn-info" onclick="CargarSocio(' + MiItems[i].ID + ')">Editar</button>' +
                    '<button class="btn btn-danger" onclick="EliminarSocio(' + MiItems[i].ID + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';
                $('.socios').html(Valores);
            }
        }
    });
}

function AgregarSocio() {
    var datossocio = {
        NOMBRE: $('#nombre').val(),
        RAZONSOCIAL: $('#razonsocial').val(),
        DIRECCION: $('#direccion').val(),
        TIPO_SOCIO: $('#tipo_socio').val(),
        CONTACTO: $('#contacto').val(),
        EMAIL: $('#email').val(),
        FECHA_CREADO: $('#fecha_creado').val(),
        ESTADO: $('#estado').val(),
        TELEFONO: $('#telefono').val()
    };

    var datossociojson = JSON.stringify(datossocio);
    $.ajax({
        url: UrlPostSocios,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'appplication/json',
        succes: function (response) {
            console.log(response);
        }

    }); alert("Socio Agregado");
}

function CargarSocio(idsocio){
    var datossocio = {
        id: idsocio
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#nombre').val(MiItems[0].NOMBRE);
            $('#razonsocial').val(MiItems[0].RAZON_SOCIAL);
            $('#direccion').val(MiItems[0].DIRECCION);
            $('#tipo_socio').val(MiItems[0].TIPO_SOCIO);
            $('#contacto').val(MiItems[0].CONTACTO);
            $('#email').val(MiItems[0].EMAIL);
            $('#fecha_creado').val(MiItems[0].FECHA_CREADO);
            $('#estado').val(MiItems[0].ESTADO);
            $('#telefono').val(MiItems[0].TELEFONO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarSocio(' + MiItems[0].id+ ')"' +
                'value="Actualizar Socio" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
        }
    });
        

}

function ActualizarSocio(idsocio) {
    var datossocio = {
        id: idsocio,
        NOMBRE: $('#nombre').val(),
        RAZONSOCIAL: $('#razonsocial').val(),
        DIRECCION: $('#direccion').val(),
        TIPO_SOCIO: $('#tipo_socio').val(),
        CONTACTO: $('#contacto').val(),
        EMAIL: $('#email').val(),
        FECHA_CREADO: $('#fecha_creado').val(),
        ESTADO: $('#estado').val(),
        TELEFONO: $('#telefono').val()
    };
    var datossociojson = JSON.stringify(datossocio);
 //alert(datossociojson);
    $.ajax({
        url: UrlPutsocios,
        type: 'PUT',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Socio Actualizado");
}


function EliminarSocio(idsocio) {
    var datossocio = {
        id: idsocio
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlDeleteSocios,
        type: 'DELETE',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Socio Eliminado");
}
