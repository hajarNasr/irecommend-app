import React from 'react';
import '../css/tags-input.css';

class TagsInput extends React.Component{
    componentDidUpdate(newProps, newState){
        if(newState && this.props.clearTags){
            newState.tags=[];
        }
    }
   
    state = {
        tags: this.props.tags?this.props.tags: [],
        value:"",
    }
    handleChange = (e) => {
        this.setState({value: e.target.value});
    }
    handleKeyUp =(e)=> {
        if (e.keyCode === 13) this.addTag();
    }
    handleKeyDown = (e) => {
        if (e.keyCode === 8 && !this.state.value) this.editPrevTag();
    }
    addTag = () =>{
        const { tags, value } = this.state;
        let tag = value.trim();

        if (!tag) return;

        this.setState({
            tags: [...tags, tag],
            value: ""
          });
    }

    editPrevTag = ()=> {
        let { tags } = this.state;
        const tag = tags.pop();
        this.setState({ tags, value: tag });
    }
   
    render(){
        const { tags, value } = this.state;
        return(
           <div className="tag-inputs-wrapper">
                <span>tags</span>
                <ul id="tags-list">
                    {tags.map((tag, i) => (
                        <li key={tag + i} className="tag">
                            {tag}
                        </li>
                    ))}
                </ul>
                <input
                   onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault();}}
                    type="text"
                    className="tag-input"
                    value={value}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    onKeyDown={this.handleKeyDown}
                />
           </div>
        );
    }
}

export default TagsInput;