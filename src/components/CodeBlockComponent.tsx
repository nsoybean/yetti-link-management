import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'
import '../styles/CodeBlockComponent.scss'

const CodeBlockComponent = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: {
  node: any
  updateAttributes: any
  extension: any
}) => (
  <NodeViewWrapper className='code-block'>
    <select
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={(event) => updateAttributes({ language: event.target.value })}
    >
      <option value='null'>auto</option>
      <option disabled>—</option>
      {extension.options.lowlight
        .listLanguages()
        .map((lang: any, index: any) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
    </select>
    <pre>
      <NodeViewContent as='code' />
    </pre>
  </NodeViewWrapper>
)

export default CodeBlockComponent
