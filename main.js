function uploadFile() {
    var fileInput = document.getElementById('file');
    var file = fileInput.files[0];
    
    if (file) {
        var formData = new FormData();
        formData.append('file', file);

        fetch('upload', {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            if (response.ok) {
                console.log('文件上传成功！');
                addFileToList(file.name); // 将已上传文件添加到列表
            } else {
                console.error('文件上传失败。');
            }
        })
        .catch(function(error) {
            console.error('文件上传失败：', error);
        });
    } else {
        console.error('请选择要上传的文件。');
    }
}

function addFileToList(filename) {
    var fileList = document.getElementById('fileList');
    var listItem = document.createElement('li');
    var downloadLink = document.createElement('a');

    downloadLink.href = 'file/' + filename;
    downloadLink.textContent = filename;
    downloadLink.download = filename; // 设置下载属性，指定文件名

    listItem.appendChild(downloadLink);
    fileList.appendChild(listItem);
}
