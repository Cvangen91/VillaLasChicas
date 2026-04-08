function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        color: '#1F2933',
        padding: '2rem 1.5rem',
        borderTop: '4px solid #45858C',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
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
          <p style={{ margin: '0.5rem 0 0', opacity: 0.82 }}>
            Ferie, ro og gode opplevelser i Fuengirola.
          </p>
        </div>

        <p style={{ margin: 0, alignSelf: 'end', opacity: 0.72 }}>
          © {new Date().getFullYear()} Villa Las Chicas
        </p>
      </div>
    </footer>
  )
}

export default Footer