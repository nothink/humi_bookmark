export { }

const updateContents = (): void => {
  const div = document.createElement('div')
  div.id = 'hoge'
  div.style.position = 'fixed'
  div.style.top = '64px'
  div.style.left = '1px'
  div.style.width = '7px'
  div.style.height = '32px'
  div.style.backgroundColor = 'red'
  document.body.appendChild(div)
}

updateContents()
