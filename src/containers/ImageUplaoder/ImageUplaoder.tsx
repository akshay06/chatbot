import * as React from 'react'
import { connect } from 'react-redux'
import * as styles from "./ImageUplaoder.scss";
type Props = {
  dispatch: any,
  steps: any,
  previousStep: any,
  step: any,
  triggerNextStep: any,
  location: any,
  commonReducer: any
}

type State = {
}
declare let window: any;

class ImageUplaoder extends React.Component<Props, State> {

  constructor(props){
    super(props)
  }
  componentDidMount() {
    
  }
  onImageChange = (event) => {
    let files = event.target.files; // FileList object
    let images = []
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img width="100%" class="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('previewImg').insertBefore(span, null);
                let base64img = e.target.result.substr(e.target.result.indexOf('base64,')+7, e.target.result.length);
                images.push(base64img)
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
    setTimeout(() => {
      this.trigger(files, images);      
    }, 100);
  }
  trigger = (files, images) => {
    let imageArr = [];
    Object.keys(files).map( (file, index) => {
      let fileObj = {
        filename: files[file].name,
        encoding: 'base64',
        content: images[index]
      };
      imageArr.push(fileObj);
    });
    // document.getElementById('ImageUplaoder').style.height = '40px';
    this.props.triggerNextStep({trigger: '17', value: imageArr})
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    // const style = {opacity: '0'}
    return (
      <div id="ImageUplaoder" style={{ width: '100%', position: 'relative' }}>
        <input accept="image/*" name="file" multiple type="file" onChange={this.onImageChange} className={styles.imageUploadBtn} id="group_image"/>
        <label htmlFor="group_image" className={styles.customFileUpload}>
          <img width={20} style={{marginRight: '15px'}} src="https://s3-ap-southeast-1.amazonaws.com/pe-s3-order-on-chat-staging/upload-icon.png" />
          <span>Click here to Upload <br/>(multiple select)</span>
        </label>
        <div id='previewImg'></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

const mapStateToProps = (state, ownProps: any) => {
  return {
    commonReducer: state.common,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUplaoder)