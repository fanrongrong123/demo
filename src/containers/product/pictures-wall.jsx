import React from 'react'
import PropTypes from 'prop-types'
import {Upload, Icon,Modal,message} from 'antd'

import {reqDeleteImg} from '../../api'
import {BASE_IMAGE_URL} from '../../config'


function getBase64(file) {
  return new Promise ((resolve,reject) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload =() => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

class PicturesWall extends React.Component{
  static propTypes = {
    imags:PropTypes.array
  }

  state = {
    previewVisible: false, // 是否显示大图
    previewImage: '', // 预览的大图的url
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
    ],
}
getImgs = () =>{
  return this.state.fileList.map(file => file.name)
}
// 隐藏大图预览
handleCancel = () => this.setState({previewVisible:false});

// 显示大图预览
handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  this.setState({
    previewImage: file.url || file.preview,
    previewVisible: true,
  })
}

// 文件上传/删除时调用
handleChange = async ({file,fileList}) =>{
  console.log('handleChange',file.status,file === fileList[fileList.length-1])

  // 上传已完成
  if (file.status === 'done') {
    file = fileList[fileList.length-1]
    const {name,url} = file.response.data
    file.name = name
    file.url = url
  }else if (file.status === 'removed') {
    const result = await reqDeleteImg(file.name)
    if (result.status === 0) {
      message.success('删除图片成功')
    }
  }
  // 更新状态显示
  this.setState({fileList})
}


componentDidMount() {
  const imgs = this.props.imgs
  if (imgs && imgs.length>0) {
    const fileList = imgs.map((img,index) => ({
      uid:-index,
      name:img,
      status:'done',
      url:BASE_IMAGE_URL+img,
    }))

    // 更新状态
    this.setState({
      fileList
    })
  }
}

// 渲染
render() {
  const { previewVisible, previewImage, fileList } = this.state;
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <div>
      <Upload
        action="/manage/img/upload"
        listType="picture-card"
        fileList={fileList}
        name="image"
        onPreview={this.handlePreview}
        onChange={this.handleChange}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>

      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}
}

export default PicturesWall

