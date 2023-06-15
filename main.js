function uploadFile() {
    var fileInput = document.getElementById('file');
    var file = fileInput.files[0];
    
    if (file) {
        var formData = new FormData();
        formData.append('file', file);

        var request = new XMLHttpRequest();
        request.open('POST', 'upload.php', true);
        request.onload = function() {
            if (request.status === 200) {
                console.log('文件上传成功！');
                addFileToList(file.name); // 将已上传文件添加到列表
            } else {
                console.error('文件上传失败。');
            }
        };
        request.send(formData);
    } else {
        console.error('请选择要上传的文件。');
    }
}

function addFileToList(filename) {
    var fileList = document.getElementById('fileList');
    var listItem = document.createElement('li');
    var downloadLink = document.createElement('a');

    downloadLink.href = 'file/' + filename; // 存储文件夹路径改为 'file/' + filename
    downloadLink.textContent = filename;
    downloadLink.download = filename; // 设置下载属性，指定文件名

    listItem.appendChild(downloadLink);
    fileList.appendChild(listItem);
}
