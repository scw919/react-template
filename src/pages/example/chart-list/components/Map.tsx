import { Scene, PolygonLayer, LineLayer } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        style: 'dark',
        center: [3.438, 40.16797],
        zoom: 0.51329,
        pitch: 0,
      }),
    });

    Promise.all([
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json').then((d) =>
        d.json(),
      ),
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/f3c467a4-9ae0-4f08-bb5f-11f9c869b2cb.json',
      ).then((d) => d.json()),
    ]).then(function onLoad([world, population]) {
      const popobj = {};
      population.forEach((item: { [x: string]: any; Code: string | number }) => {
        popobj[item.Code] = item['Population, female (% of total) (% of total)'];
      });
      // 数据绑定
      // eslint-disable-next-line no-param-reassign
      world.features = world.features.map(
        (fe: { properties: { female: number }; id: string | number }) => {
          // eslint-disable-next-line no-param-reassign
          fe.properties.female = popobj[fe.id] * 1 || 0;
          return fe;
        },
      );
      const colors = [
        '#0A3663',
        '#1558AC',
        '#3771D9',
        '#4D89E5',
        '#64A5D3',
        '#72BED6',
        '#83CED6',
        '#A6E1E0',
        '#B8EFE2',
        '#D7F9F0',
      ];
      const layer = new PolygonLayer({})
        .source(world)
        .scale('female', {
          type: 'quantile',
        })
        .color('female', colors)
        .shape('fill')
        .style({
          opacity: 0.9,
        });

      const layer2 = new LineLayer({
        zIndex: 2,
      })
        .source(world)
        .color('#fff')
        .size(0.3)
        .style({
          opacity: 1,
        });

      scene.addLayer(layer);
      scene.addLayer(layer2);
    });
  }, []);
  return (
    <div
      id="map"
      style={{
        width: '80%',
        height: '80%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        background: '#fff',
      }}
    ></div>
  );
};
export default Map;
