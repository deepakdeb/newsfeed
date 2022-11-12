
const Footer = () => {
  const d = new Date();
  return (
    <footer>
      <p>Copyright &copy; {d.getFullYear()}</p>
    </footer>
  )
}

export default Footer