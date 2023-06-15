from flask import Flask, request, send_from_directory
import os

app = Flask(__name__)

# 设置允许上传的文件类型
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

# 配置上传文件的保存路径
UPLOAD_FOLDER = 'file'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 允许上传的文件类型检查
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 文件上传接口
@app.route('/upload', methods=['POST'])
def upload_file():
    # 检查是否有文件上传
    if 'file' not in request.files:
        return '没有选择文件'
    
    file = request.files['file']
    
    # 检查文件名和文件类型是否合法
    if file.filename == '':
        return '文件名为空'
    if not allowed_file(file.filename):
        return '不允许上传该类型的文件'
    
    # 保存文件
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    
    return '文件上传成功'

# 文件下载接口
@app.route('/file/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run()
