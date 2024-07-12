import React from 'react';

function Sections({ params }: { params: { code: string } }) {
  return <div>Guidebook {params.code}</div>;
}

export default Sections;
