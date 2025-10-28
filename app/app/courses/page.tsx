'use client';
import { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard';
export default function CoursesPage(){const [courses,setCourses]=useState<any[]>([]);useEffect(()=>{(async()=>{const r=await fetch('/api/courses');if(r.ok)setCourses(await r.json());})()},[]);return(<main className="p-6"><h1 className="title mb-4">Cursos</h1><div className="grid-3">{courses.map(c=><CourseCard key={c.id} c={c}/>)}</div></main>)}
