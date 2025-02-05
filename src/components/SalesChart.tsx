import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../hooks/useTheme';

interface DataPoint {
  date: Date;
  projects: number;
  sales: number;
  commissions: number;
  profit: number;
}

const weeklyData: DataPoint[] = [
  { date: new Date('2024-03-01'), projects: 8, sales: 320000, commissions: 32000, profit: 64000 },
  { date: new Date('2024-03-08'), projects: 10, sales: 380000, commissions: 38000, profit: 76000 },
  { date: new Date('2024-03-15'), projects: 12, sales: 420000, commissions: 42000, profit: 84000 },
  { date: new Date('2024-03-22'), projects: 9, sales: 350000, commissions: 35000, profit: 70000 },
];

const monthlyData: DataPoint[] = [
  { date: new Date('2023-10'), projects: 38, sales: 1520000, commissions: 152000, profit: 304000 },
  { date: new Date('2023-11'), projects: 34, sales: 1368000, commissions: 136800, profit: 273600 },
  { date: new Date('2023-12'), projects: 41, sales: 1620000, commissions: 162000, profit: 324000 },
  { date: new Date('2024-01'), projects: 42, sales: 1692000, commissions: 169200, profit: 338400 },
  { date: new Date('2024-02'), projects: 47, sales: 1872000, commissions: 187200, profit: 374400 },
  { date: new Date('2024-03'), projects: 52, sales: 2088000, commissions: 208800, profit: 417600 },
];

const yearlyData: DataPoint[] = [
  { date: new Date('2019'), projects: 312, sales: 12500000, commissions: 1250000, profit: 2500000 },
  { date: new Date('2020'), projects: 395, sales: 15800000, commissions: 1580000, profit: 3160000 },
  { date: new Date('2021'), projects: 455, sales: 18200000, commissions: 1820000, profit: 3640000 },
  { date: new Date('2022'), projects: 538, sales: 21500000, commissions: 2150000, profit: 4300000 },
  { date: new Date('2023'), projects: 620, sales: 24800000, commissions: 2480000, profit: 4960000 },
  { date: new Date('2024'), projects: 705, sales: 28200000, commissions: 2820000, profit: 5640000 },
];

type TimePeriod = 'weekly' | 'monthly' | 'yearly';

const lineColors = {
  projects: '#f59e0b',
  sales: '#3b82f6',
  commissions: '#8b5cf6',
  profit: '#22c55e',
};

export function SalesChart() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly');
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const getTimeFormat = (period: TimePeriod) => {
    switch (period) {
      case 'weekly':
        return d3.timeFormat('%b %d');
      case 'monthly':
        return d3.timeFormat('%b %Y');
      case 'yearly':
        return d3.timeFormat('%Y');
    }
  };

  const getData = (period: TimePeriod) => {
    switch (period) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      case 'yearly':
        return yearlyData;
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const data = getData(timePeriod);

    // Clear existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 60 };
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
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    const yProjects = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.projects) as number])
      .range([height, 0])
      .nice();

    const yFinancial = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.sales, d.commissions, d.profit)) as number])
      .range([height, 0])
      .nice();

    // Create line generators
    const createLine = (key: keyof DataPoint, scale: d3.ScaleLinear<number, number>) =>
      d3
        .line<DataPoint>()
        .x(d => x(d.date))
        .y(d => scale(d[key] as number))
        .curve(d3.curveMonotoneX);

    // Add grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(x)
          .ticks(6)
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
        d3.axisLeft(yFinancial)
          .ticks(5)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)')
      );

    // Add the lines
    const lines = [
      { key: 'projects', scale: yProjects },
      { key: 'sales', scale: yFinancial },
      { key: 'commissions', scale: yFinancial },
      { key: 'profit', scale: yFinancial },
    ] as const;

    lines.forEach(({ key, scale }) => {
      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', lineColors[key])
        .attr('stroke-width', 2)
        .attr('d', createLine(key, scale));
    });

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(getTimeFormat(timePeriod) as any))
      .call(g => g.select('.domain').attr('stroke', isDark ? '#4b5563' : '#e5e7eb'))
      .call(g => g.selectAll('.tick text').attr('fill', isDark ? '#9ca3af' : '#6b7280'));

    // Add left y-axis (Financial)
    svg
      .append('g')
      .call(d3.axisLeft(yFinancial).ticks(5).tickFormat(d => `$${d3.format('.0s')(d)}`))
      .call(g => g.select('.domain').attr('stroke', isDark ? '#4b5563' : '#e5e7eb'))
      .call(g => g.selectAll('.tick text').attr('fill', isDark ? '#9ca3af' : '#6b7280'));

    // Add right y-axis (Projects)
    svg
      .append('g')
      .attr('transform', `translate(${width},0)`)
      .call(d3.axisRight(yProjects).ticks(5).tickFormat(d => d.toString()))
      .call(g => g.select('.domain').attr('stroke', isDark ? '#4b5563' : '#e5e7eb'))
      .call(g => g.selectAll('.tick text').attr('fill', isDark ? '#9ca3af' : '#6b7280'));

    // Add hover effects
    const focus = svg.append('g').style('display', 'none');

    // Add circles for hover points
    lines.forEach(({ key }) => {
      focus
        .append('circle')
        .attr('class', `${key}-point`)
        .attr('r', 4)
        .attr('fill', lineColors[key]);
    });

    // Add tooltip
    const tooltip = d3
      .select(tooltipRef.current)
      .style('display', 'none')
      .style('position', 'fixed')
      .style('background-color', isDark ? '#1f2937' : 'white')
      .style('border', `1px solid ${isDark ? '#374151' : '#e5e7eb'}`)
      .style('border-radius', '0.75rem')
      .style('padding', '1rem')
      .style('pointer-events', 'none')
      .style('z-index', '100')
      .style('box-shadow', '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)');

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
        const bisect = d3.bisector((d: DataPoint) => d.date).left;
        const x0 = x.invert(d3.pointer(event)[0]);
        const i = bisect(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;

        lines.forEach(({ key, scale }) => {
          focus
            .select(`.${key}-point`)
            .attr('transform', `translate(${x(d.date)},${scale(d[key] as number)})`);
        });

        tooltip
          .html(
            `<div class="space-y-3">
              <div class="text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}">${getTimeFormat(timePeriod)(d.date)}</div>
              
              <div class="space-y-2">
                <div class="flex items-center justify-between gap-8">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-amber-500"></div>
                    <div class="text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}">Projects</div>
                  </div>
                  <div class="text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}">${d.projects}</div>
                </div>

                <div class="flex items-center justify-between gap-8">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div class="text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}">Sales</div>
                  </div>
                  <div class="text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}">$${d3.format(',.0f')(d.sales)}</div>
                </div>

                <div class="flex items-center justify-between gap-8">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-purple-500"></div>
                    <div class="text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}">Commissions</div>
                  </div>
                  <div class="text-sm font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}">$${d3.format(',.0f')(d.commissions)}</div>
                </div>

                <div class="flex items-center justify-between gap-8">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                    <div class="text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}">Net Profit</div>
                  </div>
                  <div class="text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'}">$${d3.format(',.0f')(d.profit)}</div>
                </div>
              </div>
            </div>`
          )
          .style('left', `${event.clientX - 300}px`)
          .style('top', `${event.clientY -100}px`);
      });
  }, [isDark, timePeriod]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Commissions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Net Profit</span>
          </div>
        </div>
        <div className="flex gap-2">
          {(['weekly', 'monthly', 'yearly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                timePeriod === period
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <svg ref={svgRef} className="w-full" />
      <div ref={tooltipRef} className="pointer-events-none" />
    </div>
  );
}