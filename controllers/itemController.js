"use strict";

var response = require("../res");
var connection = require("../conn");
const pyFileNikParse = "./pyscript/nik_parse.py";
const pyFileCekDPT = "./pyscript/cekdpt.py";

function cekNIKDpt(NIK) {
  return new Promise((resolve, reject) => {
    var spawn = require("child_process").spawn;
    var args = ["-n", NIK];
    args.unshift(pyFileCekDPT);
    var pyspawn = spawn("python", args);
    var result = "";

    pyspawn.stdout.on(`data`, (data) => {
      result += data;
    });

    pyspawn.on("close", function (code) {
      resolve(result);
    });
    pyspawn.on("error", function (err) {
      reject(err);
    });
  });
}

function getDataNIK(NIK) {
  return new Promise((resolve, reject) => {
    var spawn = require("child_process").spawn;
    var args = ["-n", NIK];
    args.unshift(pyFileNikParse);
    var pyspawn = spawn("python", args);
    var result = "";

    pyspawn.stdout.on(`data`, (data) => {
      result += data.toString();
    });

    pyspawn.on("close", function (code) {
      resolve(result);
    });
    pyspawn.on("error", function (err) {
      reject(err);
    });
  });
}

exports.cekNIK = async function (req, res) {
  var NIK = req.body.NIK;
  var q = "SELECT * FROM `peserta_pertemuan` WHERE NIK = ?";
  var values = "";
  var isVerified = false;
  var duplicate = false;
  const cek = await cekNIKDpt(NIK);

  connection.query(q, [NIK], function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length != 0) { // check duplicate
        values = "NIK sudah terdaftar, mohon hubungi call center kami";
        duplicate = true;
      } else {
        var result = cek.match(/\d,\s(.+),/);

        if (result) {
          values = result[1].split(",")[0];
          isVerified = true;
        }
        
        duplicate = false;
      }

      var data = {
        values: values,
        verified: isVerified,
        duplicate: duplicate
      };

      res.json(data);
      res.end();
    }
  });
};

exports.postRelawan = async function (req, res) {
  var NIK = req.body.NIK;
  const dataNIK = JSON.parse(await getDataNIK(NIK));
  var namaLengkap = req.body.namaLengkap;
  var gender = req.body.gender;
  var phone = req.body.phone;
  var tanggalLahir = dataNIK.data.lahir;
  var registerDate = new Date();
  var kelurahan = req.body.kelurahan.toUpperCase();
  //   var kelurahan = dataNIK.data.kelurahan;
  var provinsi = dataNIK.data.provinsi;
  var kotaKabupaten = dataNIK.data.kotakab;
  var kecamatan = dataNIK.data.kecamatan;
  var RT = req.body.RT;
  var RW = req.body.RW;

  var q =
    "INSERT INTO peserta_pertemuan (program_id, nama_lengkap, gender, phone, NIK, tanggal_lahir, register_date, provinsi, kota_kabupaten, kecamatan, kelurahan, RT, RW) VALUES ('', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    q,
    [
      namaLengkap,
      gender,
      phone,
      NIK,
      tanggalLahir,
      registerDate,
      provinsi,
      kotaKabupaten,
      kecamatan,
      kelurahan,
      RT,
      RW,
    ],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// exports.findItems = function (req, res) {
//   var item_name =
//     req.query.item_name == undefined ? "%%" : "%" + req.query.item_name + "%";
//   var item_merk =
//     req.query.item_merk == undefined ? "%%" : "%" + req.query.item_merk + "%";
//   var input_date_from = req.query.input_date_from;
//   var input_date_to = req.query.input_date_to;
//   var input_by =
//     req.query.input_by == undefined ? "%%" : "%" + req.query.input_by + "%";

//   var q =
//     " SELECT * FROM atk WHERE item LIKE ? AND merk LIKE ? AND tanggal_input BETWEEN ? AND ? AND input_by LIKE ?";

//   connection.query(
//     q,
//     [item_name, item_merk, input_date_from, input_date_to, input_by],
//     function (error, rows, fields) {
//       if (error) {
//         console.log(error);
//       } else {
//         response.ok(rows, res);
//       }
//     }
//   );
// };

// exports.addItems = function (req, res) {
//   var item_name = req.body.item_name;
//   var item_merk = req.body.item_merk;
//   var item_qty = req.body.item_qty;
//   var input_by = req.body.input_by;

//   var q =
//     "INSERT INTO atk (item, merk, qty, tanggal_input, input_by) values (?, ?, ?, CURDATE(), ?)";

//   connection.query(
//     q,
//     [item_name, item_merk, item_qty, input_by],

//     function (error, rows, fields) {
//       if (error) {
//         console.log(error);
//       } else {
//         response.ok("Berhasil menambahkan item!", res);
//       }
//     }
//   );
// };

// exports.itemDetails = function (req, res) {
//   var item_id = req.params.item_id;

//   var q = " SELECT * FROM atk WHERE id = ? ";

//   connection.query(
//     q,
//     [item_id],

//     function (error, rows, fields) {
//       if (error) {
//         console.log(error);
//       } else {
//         response.ok(rows, res);
//       }
//     }
//   );
// };

// exports.updateItem = function (req, res) {
//   var item_id = req.params.item_id;
//   var item_name = req.body.item_name;
//   var item_merk = req.body.item_merk;
//   var item_qty = req.body.item_qty;

//   var q =
//     " UPDATE atk SET qty = ?, item = ?, merk = ?, tanggal_input = CURDATE() WHERE id = ? ";

//   connection.query(
//     q,
//     [item_qty, item_name, item_merk, item_id],

//     function (error, rows, fields) {
//       if (error) {
//         console.log(error);
//       } else {
//         response.ok("Berhasil mengedit item!", res);
//       }
//     }
//   );
// };

// exports.deleteItem = function (req, res) {
//   var item_id = req.params.item_id;

//   var q = " DELETE FROM atk WHERE id = ? ";

//   connection.query(
//     q,
//     [item_id],

//     function (error, rows, fields) {
//       if (error) {
//         console.log(error);
//       } else {
//         response.ok("Berhasil menghapus item!", res);
//       }
//     }
//   );
// };
