
const If = ({children , condition}: {children: React.ReactNode , condition: boolean}) => {
  if(condition) return children
}

export default If
