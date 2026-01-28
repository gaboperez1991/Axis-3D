const Pagination = ({ pagina, totalPaginas, setPagina }) => {
  return (
    <div className="paginacion">
      <button
        disabled={pagina <= 2}
        onClick={() => setPagina(p => Math.max(1, p - 2))}
      >
        ◀
      </button>

      <span>Página {pagina} de {totalPaginas}</span>

      <button
        disabled={pagina + 1 >= totalPaginas}
        onClick={() => setPagina(p => Math.min(totalPaginas, p + 2))}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;

