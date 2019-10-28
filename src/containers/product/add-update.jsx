import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button,
  message
} from 'antd'

import memoryUtils from '../../utils/memory'
import {getCategorysAsync} from '../../redux/action-creators/categorys'
import LinkButton from '../../components/link-button'
import {reqAddUpdateProduct} from '../../api'
import PicturesWall from "./pictures-wall"
import RichTextEditor from "./rich-text-editor"

const {Item} = Form
const {Option} = Select

