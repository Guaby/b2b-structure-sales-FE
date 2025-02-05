import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../hooks/useTheme';

interface EnergyData {
  time: string;
  production: number;
  consumption: number;
}

const generateHourlyData = (): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  for (let i = 0; i < 24; i++) {
    const time = new Date(startOfDay.getTime() + i * 3600000);
    const hour = time.getHours();
    
    // Simulate solar production (higher during daylight hours)
    let production = 0;
    if (hour >= 6 && hour <= 18) {
      production = 4 + Math.sin((hour - 6) * Math.PI / 12) * 4;
    }

    // Simulate consumption (base load + activity peaks)
    let consumption = 1.5; // Base load
    if (hour >= 7 && hour <= 9) consumption += 3; // Morning peak
    if (hour >= 18 && hour <= 21) consumption += 4; // Evening peak
    consumption += Math.random() * 0.5; // Random variation

    data.push({
      time: time.toISOString(),
      production: Math.max(0, production + Math.random() * 0.5),
      consumption: Math.max(0, consumption)
    });
  }

  return data;
};

export function EnergyChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!svgRef.current) return;

    const data = generateHourlyData();

    // Clear existing content
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => new Date(d.time)) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.production, d.consumption)) as number])
      .range([height, 0])
      .nice();

    // Add grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(x)
          .ticks(12)
          .tickSize(-height)
          .tickFormat(() => '')
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)')
      );

    svg
      .append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)')
      );

    // Create area generators
    const areaProduction = d3
      .area<EnergyData>()
      .x(d => x(new Date(d.time)))
      .y0(height)
      .y1(d => y(d.production))
      .curve(d3.curveMonotoneX);

    const areaConsumption = d3
      .area<EnergyData>()
      .x(d => x(new Date(d.time)))
      .y0(height)
      .y1(d => y(d.consumption))
      .curve(d3.curveMonotoneX);

    // Add the areas
    svg
      .append('path')
      .datum(data)
      .attr('fill', isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.1)')
      .attr('d', areaProduction);

    svg
      .append('path')
      .datum(data)
      .attr('fill', isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)')
      .attr('d', areaConsumption);

    // Add the lines
    const lineProduction = d3
      .line<EnergyData>()
      .x(d => x(new Date(d.time)))
      .y(d => y(d.production))
      .curve(d3.curveMonotoneX);

    const lineConsumption = d3
      .line<EnergyData>()
      .x(d => x(new Date(d.time)))
      .y(d => y(d.consumption))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 2)
      .attr('d', lineProduction);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', lineConsumption);

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(12).tickFormat(d3.timeFormat('%H:%M') as any))
      .call(g => g.select('.domain').attr('stroke', isDark ? '#4b5563' : '#e5e7eb'))
      .call(g => g.selectAll('.tick text').attr('fill', isDark ? '#9ca3af' : '#6b7280'));

    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}kW`))
      .call(g => g.select('.domain').attr('stroke', isDark ? '#4b5563' : '#e5e7eb'))
      .call(g => g.selectAll('.tick text').attr('fill', isDark ? '#9ca3af' : '#6b7280'));

    // Add hover effects
    const tooltip = d3
      .select(tooltipRef.current)
      .style('display', 'none')
      .style('position', 'absolute')
      .style('background-color', isDark ? '#1f2937' : 'white')
      .style('border', `1px solid ${isDark ? '#374151' : '#e5e7eb'}`)
      .style('border-radius', '0.5rem')
      .style('padding', '0.75rem')
      .style('pointer-events', 'none')
      .style('z-index', '50')
      .style('box-shadow', '0 4px 6px -1px rgb(0 0 0 / 0.1)');

    const focus = svg.append('g').style('display', 'none');

    // Add vertical line
    focus
      .append('line')
      .attr('class', 'vertical-line')
      .attr('y1', 0)
      .attr('y2', height)
      .style('stroke', isDark ? '#4b5563' : '#e5e7eb')
      .style('stroke-dasharray', '4,4');

    // Add circles for both lines
    focus
      .append('circle')
      .attr('class', 'production-point')
      .attr('r', 4)
      .style('fill', '#22c55e');

    focus
      .append('circle')
      .attr('class', 'consumption-point')
      .attr('r', 4)
      .style('fill', '#3b82f6');

    // Add hover area
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', () => {
        focus.style('display', null);
        tooltip.style('display', null);
      })
      .on('mouseout', () => {
        focus.style('display', 'none');
        tooltip.style('display', 'none');
      })
      .on('mousemove', (event) => {
        const bisect = d3.bisector((d: EnergyData) => new Date(d.time)).left;
        const x0 = x.invert(d3.pointer(event)[0]);
        const i = bisect(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0.getTime() - new Date(d0.time).getTime() > new Date(d1.time).getTime() - x0.getTime() ? d1 : d0;

        focus
          .select('.vertical-line')
          .attr('transform', `translate(${x(new Date(d.time))},0)`);

        focus
          .select('.production-point')
          .attr('transform', `translate(${x(new Date(d.time))},${y(d.production)})`);

        focus
          .select('.consumption-point')
          .attr('transform', `translate(${x(new Date(d.time))},${y(d.consumption)})`);

        tooltip
          .html(
            `<div class="space-y-2">
              <div class="text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}">
                ${d3.timeFormat('%H:%M')(new Date(d.time))}
              </div>
              <div class="space-y-1">
                <div class="flex items-center justify-between gap-8">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                    <span class="text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}">Production</span>
                  </div>
                  <span class="text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}">${d.production.toFixed(1)} kW</span>
                </div>
                <div class="flex items-center justify-between gap-8">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span class="text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}">Consumption</span>
                  </div>
                  <span class="text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}">${d.consumption.toFixed(1)} kW</span>
                </div>
              </div>
            </div>`
          )
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 15}px`);
      });

    // Add legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 200},${margin.top})`);

    const legendItems = [
      { label: 'Production', color: '#22c55e' },
      { label: 'Consumption', color: '#3b82f6' }
    ];

    legendItems.forEach((item, i) => {
      const g = legend
        .append('g')
        .attr('transform', `translate(0,${i * 20})`);

      g.append('line')
        .attr('x1', 0)
        .attr('x2', 20)
        .attr('stroke', item.color)
        .attr('stroke-width', 2);

      g.append('text')
        .attr('x', 30)
        .attr('y', 5)
        .text(item.label)
        .attr('fill', isDark ? '#9ca3af' : '#6b7280')
        .style('font-size', '12px');
    });
  }, [isDark]);

  return (
    <div className="relative">
      <svg ref={svgRef} className="w-full" />
      <div ref={tooltipRef} />
    </div>
  );
}