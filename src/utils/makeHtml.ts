
import showdown from 'showdown'

export default function makeHtml(html: string) {
    // transform each line of a markdown string into html

    const markdownConverter = new showdown.Converter()

    return html
          .split('\n')
          .map((line: string) => markdownConverter.makeHtml(line))
          .join('\n')

    
}

