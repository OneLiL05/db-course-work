import type { Job, JobSkill } from '@skill-swap/shared'
import { PDFDocument, rgb } from 'pdf-lib'

export const useJobPdf = () => {
  const generateJobReportPdf = async (job: Job) => {
    const pdfDoc = await PDFDocument.create()

    const page = pdfDoc.addPage([600, 800])

    const { height } = page.getSize()
    const fontSize = 12

    // Add Header
    page.drawText(`Job Report: ${job.name || 'N/A'}`, {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0, 0.8),
    })

    page.drawText(`Company: ${job.company.name || 'N/A'}`, {
      x: 50,
      y: height - 100,
      size: fontSize,
    })
    page.drawText(`Description: ${job.company.description || 'N/A'}`, {
      x: 50,
      y: height - 120,
      size: fontSize,
    })
    page.drawText(`Verified: ${job.company.isVerified ? 'Yes' : 'No'}`, {
      x: 50,
      y: height - 140,
      size: fontSize,
    })

    page.drawText(`City: ${job.city.name || 'N/A'}`, {
      x: 50,
      y: height - 180,
      size: fontSize,
    })
    page.drawText(`Category: ${job.category.name || 'N/A'}`, {
      x: 50,
      y: height - 200,
      size: fontSize,
    })
    page.drawText(`Position: ${job.position.name || 'N/A'}`, {
      x: 50,
      y: height - 220,
      size: fontSize,
    })
    page.drawText(
      `Salary: ${job.salary.amount || 'N/A'} ${job.salary.currency || ''} (${job.salary.period || 'N/A'})`,
      {
        x: 50,
        y: height - 240,
        size: fontSize,
      },
    )

    const tableStartY = height - 300
    const tableColumnX = [50, 300]
    const rowHeight = 20

    page.drawText('Skill name', {
      x: tableColumnX[0],
      y: tableStartY,
      size: fontSize,
      color: rgb(0, 0, 0.6),
    })
    page.drawText('Level', {
      x: tableColumnX[1],
      y: tableStartY,
      size: fontSize,
      color: rgb(0, 0, 0.6),
    })

    job.skills.forEach((skill: JobSkill, index: number) => {
      const rowY = tableStartY - (index + 1) * rowHeight
      page.drawText(skill.name || 'N/A', {
        x: tableColumnX[0],
        y: rowY,
        size: fontSize,
      })
      page.drawText(skill.level || 'N/A', {
        x: tableColumnX[1],
        y: rowY,
        size: fontSize,
      })
    })

    const currentDate = new Date().toLocaleDateString('en')
    page.drawText(`Report generated: ${currentDate}`, {
      x: 50,
      y: 50,
      size: fontSize,
      color: rgb(0, 0, 0.6),
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `Job_Report_${job.name || 'Job'}.pdf`
    link.click()
  }

  return { generateJobReportPdf }
}
