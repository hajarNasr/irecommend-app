import React from 'react';
import marked from 'marked';

marked.setOptions({
    breaks: true,
  }); 

const renderer = new marked.Renderer();

renderer.link =  (href, title, text) =>(
     `<a target="_blank" href="${href}">${text}</a>`
);

const RecommendationPreviewer = (props)=>(
   <MarkdownPreview {...props}/>
);

class MarkdownPreview extends React.Component {
    createMarkup() {
      let {content, isFullContent} = this.props;
      if(!isFullContent){
          content = content.slice(0, 700)}
          
      return  { __html: marked(content,{ renderer: renderer }) }   
    }
    
    render() {
      return (
        <div className={this.props.className} 
             dangerouslySetInnerHTML={this.createMarkup()}>
        </div>
      )
    }
}

export default RecommendationPreviewer;