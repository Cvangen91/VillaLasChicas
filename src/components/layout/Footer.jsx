function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#2F3640',
        color: '#F2F2F2',
        padding: '2rem 1.5rem',
        borderTop: '4px solid #45858C',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <strong style={{ color: '#8AB5BF' }}>Villa Las Chicas</strong>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
            Ferie, ro og gode opplevelser i Fuengirola.
          </p>
        </div>

        <p style={{ margin: 0, alignSelf: 'end', opacity: 0.8 }}>
          © {new Date().getFullYear()} Villa Las Chicas
        </p>
      </div>
    </footer>
  )
}

export default Footer