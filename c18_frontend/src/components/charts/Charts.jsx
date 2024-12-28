import Card from '@components/Card';
import Pie from '@components/Pie';
import Bar from '@components/Bar';
import XBar from '@components/XBar';
const Charts = () => {
  return (
    <>
      <h1 className="text-black text-3xl mb-4 m-3 md:text-center">
        Metricas y Resultados
      </h1>
      <div className="bg-purple-700 h-0.5 w-lvw"></div>
      <div className="w-10/12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Card titulo="titulo" number="1" />
          <Card titulo="titulo" number="2" />
          <Card titulo="titulo" number="3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {/* Agrega estilos de Tailwind CSS al componente Card o directamente al gráfico */}
          <Card titulo="titulo" number={<Pie />} />
          <Card titulo="titulo" number={<Bar />} />
          <Card titulo="titulo" number={<XBar />} />
        </div>
      </div>
    </>
  );
};

export default Charts;
