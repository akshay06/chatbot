import * as React from 'react'
import { connect } from 'react-redux'
import { getLocation, updateCommon } from '../../actions/CommonAction';

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
                images.push(e.target.result)
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
    this.trigger(files, images)
  }
  trigger = (files, images) => {
    // console.log('alal', files, images);
    this.props.triggerNextStep({trigger: '19', value: images})
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    // const style = {opacity: '0'}
    return (
      <div id="ImageUplaoder" style={{ width: '100%', position: 'relative' }}>
        <input accept="image/*" name="file" multiple type="file" onChange={this.onImageChange} className="filetype" id="group_image"/>
        {/* <label htmlFor="file">Click Here to upload</label> */}
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