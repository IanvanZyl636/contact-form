import DOMPurify from 'dompurify';

interface HtmlRenderProps{
    html:string;
    className?:string;
}

export default function HtmlRender({html,className}:HtmlRenderProps){
    const sanitizedHtml = DOMPurify.sanitize(html);

    return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
}