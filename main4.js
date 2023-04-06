let heading = ` <tr>
<th>ID</th>
<th>Tên hoa</th>
<th>Loại hoa</th>
<th>Hình ảnh</th>
<th>Chức năng</th>
</tr>`
var nameElement = document.getElementById('name')
var typeElement = document.getElementById('type')
function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message');
    input.onblur = function () {
        if (input.value === '') {
            errorElement.setAttribute('style', 'color: red; font-style: italic;');
            errorElement.innerText = 'Vui lòng nhập';
        } else {
            errorElement.innerText = '';
        }
    }
}
handleBlurInput(nameElement)
handleBlurInput(typeElement)

var listHoa = [];
async function renderHoa() {
    listHoa = await fetch('http://localhost:3004/listHoa')
        .then(function (response) {
            return response.json()
        });

    function render(flower) {
        return `<tr>
            <td>${flower.id}</td>
            <td>${flower.tenHoa}</td>
            <td>${flower.loaiHoa}</td>
            <td><img src="${flower.hinhAnh}" alt="${flower.hinhAnh}" /></td>
            <td>
                            <a onclick="update(${flower.id})" href="#" title="Sửa"><img src="images/pencil.gif" alt="pencil.gif" />Sửa</a>
                            <a onclick="remove(${flower.id})" href="#" title="Xóa"><img src="images/bin.gif" alt="bin.gif" />Xóa</a>
                        </td>
            </tr>`
    }
    function renderFlowers(listHoa) {
        let elementTable = document.querySelector('table')
        let str = ''
        for (const flower of listHoa) {
            str += render(flower)
        }
        elementTable.innerHTML = heading + str
    }
    renderFlowers(listHoa)
}
renderHoa()
async function remove(id) {

    console.log(id);
    var result = confirm('Bạn có muốn xóa hoa này ? ')
    if (result === true) {
        // listcourses.splice(index, name)
        var options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        await fetch('http://localhost:3004/listHoa' + '/' + id, options)
            .then(function (response) {
                return response.json();
            });
    } else {
        renderHoa()
    }
    renderHoa()
}
// async function add() {
//     document.querySelectorAll("label").forEach(label => {
//         label.style.display = "block";
//     });
//     document.querySelectorAll("input").forEach(input => {
//         input.style.display = "block";
//     });
//     document.querySelectorAll("button").forEach(button => {
//         button.style.display = "block";
//     });

//     let btnEl = document.getElementById('addFlower')
//     btnEl.onclick = async function () {
//         let newName = document.getElementById('name').value
//         let newType = document.getElementById('type').value

//         if ( newName && newType){
//             var formData = {
//                 tenHoa: newName,
//                 loaiHoa: newType,
//                 hinhAnh: "images/tmp/hoa1.jpg"
//             }
//             var options = {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             }

//             await fetch('http://localhost:3004/listHoa', options)
//                 .then(function (response) {
//                     return response.json();
//                 });

//             renderHoa()
//         }else{
//             let errorElement = document.getElementById('error-message')
//             errorElement.innerHTML = 'Vui lòng nhập đầy đủ thông tin '
//             errorElement.style.color = 'red'
//         }
//     }
// }
//
function add() {
    $("label").show();
    $("input").show();
    $("button").show();

    $("#addFlower").click(function () {
        let newName = $("#name").val();
        let newType = $("#type").val();

        if (newName && newType) {
            let formData = {
                tenHoa: newName,
                loaiHoa: newType,
                hinhAnh: "images/tmp/hoa1.jpg"
            };
            $.ajax({
                url: "http://localhost:3004/listHoa",
                type: "POST",
                // stringify : chuyển dữ liệu từ JSON -> string
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (response) {
                    renderHoa();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        } else {
            let errorElement = $("#error-message");
            errorElement.html("Vui lòng nhập đầy đủ thông tin");
            errorElement.css("color", "red");
        }
    });
}
// async function update(id) {
//     let a = listHoa.find(function (hoa) {
//         return hoa.id === id
//     })
//     document.querySelectorAll("label").forEach(label => {
//         label.style.display = "block";
//     });
//     document.querySelectorAll("input").forEach(input => {
//         input.style.display = "block";
//     });
//     let input = document.querySelectorAll('input')
//     input[0].value = a.tenHoa
//     input[1].value = a.loaiHoa
//     let btnUpdate = document.getElementById('updateFlower')
//     btnUpdate.style.display = 'block'
//     btnUpdate.onclick = async function () {
//         let name = document.getElementById('name').value
//         let type = document.getElementById('type').value

//         var formData = {
//             tenHoa: name,
//             loaiHoa: type,
//             hinhAnh: "images/tmp/hoa1.jpg"
//         }

//         var options = {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         }

//         await fetch('http://localhost:3004/listHoa' + "/" + id, options)
//             .then(function (response) {
//                 return response.json();
//             });
//         document.getElementById('name').value = ''
//         document.getElementById('type').value = ''
//         renderHoa()
//     }
// }
function update(id) {
    let a = listHoa.find(function (hoa) {
        return hoa.id === id;
    });

    $("label").show();
    $("input").show();
    $("button#updateFlower").show();
    $("input#name").val(a.tenHoa);
    $("input#type").val(a.loaiHoa);

    $("button#updateFlower").click(function () {
        let name = $("input#name").val();
        let type = $("input#type").val();

        var formData = {
            tenHoa: name,
            loaiHoa: type,
            hinhAnh: "images/tmp/hoa1.jpg"
        };

        $.ajax({
            url: 'http://localhost:3004/listHoa/' + id,
            type: 'PUT',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (data) {
                $("input#name").val('');
                $("input#type").val('');
                renderHoa();
            },
            error: function () {
                console.log("Error");
            }
        });
    });
}
