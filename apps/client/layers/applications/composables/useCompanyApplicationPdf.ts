import type { CompanyApplication } from '@skill-swap/shared'
import { PDFDocument, rgb } from 'pdf-lib'

export const useCompanyApplicationPdf = () => {
  const generateReport = async (application: CompanyApplication) => {
    const pdfDoc = await PDFDocument.create()

    const page = pdfDoc.addPage([600, 800])

    const { width, height } = page.getSize()
    const fontSize = 12

    page.drawText(`Application Report: ${application.applierName}`, {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0, 0.8),
    })

    page.drawText(`Application ID: ${application.id}`, {
      x: 50,
      y: height - 100,
      size: fontSize,
    })
    page.drawText(
      `Applied At: ${new Date(application.appliedAt).toLocaleString()}`,
      {
        x: 50,
        y: height - 120,
        size: fontSize,
      },
    )
    page.drawText(`Applier Name: ${application.applierName}`, {
      x: 50,
      y: height - 140,
      size: fontSize,
    })
    page.drawText(`Cover Letter: ${application.coverLetter}`, {
      x: 50,
      y: height - 160,
      size: fontSize,
      maxWidth: width - 100,
    })

    page.drawText(`Job Name: ${application.jobName}`, {
      x: 50,
      y: height - 200,
      size: fontSize,
    })
    page.drawText(`Job ID: ${application.jobId}`, {
      x: 50,
      y: height - 220,
      size: fontSize,
    })

    page.drawText(`Stage ID: ${application.stageId}`, {
      x: 50,
      y: height - 260,
      size: fontSize,
    })
    page.drawText(`Stage Name: ${application.stageName}`, {
      x: 50,
      y: height - 280,
      size: fontSize,
    })

    page.drawText(`Resume ID: ${application.resumeId}`, {
      x: 50,
      y: height - 320,
      size: fontSize,
    })
    page.drawText(`Resume Path: ${application.resumePath}`, {
      x: 50,
      y: height - 340,
      size: fontSize,
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
    link.download = `Application_Report_${application.id}.pdf`
    link.click()
  }

  return { generateReport }
}
