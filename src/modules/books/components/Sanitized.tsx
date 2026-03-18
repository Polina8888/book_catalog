import DOMPurify from 'dompurify';

interface Props {
  htmlContent: string;
}

function SanitizedDescription({ htmlContent }: Props) {
  const clean = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote'],
    ALLOWED_ATTR: [],
  });

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: clean }} 
    />
  );
}

export default SanitizedDescription;