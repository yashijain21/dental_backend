// routes/appointmentRoutes.js

const router = require("express").Router();
const Appointment = require("../models/Appointment");

router.post("/", async (req, res) => {
  const appointment =
    await Appointment.create(req.body);

  res.json(appointment);
});

router.get("/", async (req, res) => {
  const appointments =
    await Appointment.find()
      .sort({ createdAt: -1 });

  res.json(appointments);
});

router.put("/:id/read", async (req, res) => {
  await Appointment.findByIdAndUpdate(
    req.params.id,
    { isRead: true }
  );

  res.json({
    success: true,
  });
});

module.exports = router;