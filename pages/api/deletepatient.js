import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { patient_id } = req.query;

    if (!patient_id) {
      return res.status(400).json({ error: 'patient_id is required' });
    }

    try {
      const deletedPatient = await prisma.patient.delete({
        where: { patient_id: parseInt(patient_id, 10) },
      });
      res.status(200).json(deletedPatient);
    } catch (error) {
      console.error('Error deleting patient:', error);
      res.status(500).json({
        error: 'Failed to delete patient',
        details: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}