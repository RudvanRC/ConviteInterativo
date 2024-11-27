$(document).ready(function() {
  const eventoData = new Date("2025-01-12T11:00:00").getTime();

  const countdown = setInterval(() => {
      const agora = new Date().getTime();
      const distancia = eventoData - agora;

      const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

      $("#days").text(dias);
      $("#hours").text(horas);
      $("#minutes").text(minutos);
      $("#seconds").text(segundos);

      if (distancia < 0) {
          clearInterval(countdown);
          $("#countdown").html("O evento começou!");
      }
  }, 1000);

  emailjs.init("L1zRlRVhx7rPAFJz0");

  const form = $("#rsvp-form");
  const mensagemDiv = $("#mensagem");

  if (!form.length) {
      console.error("Erro: Formulário 'rsvp-form' não encontrado.");
      return;
  }

  form.on("submit", async function(event) {
      event.preventDefault();

      const formData = form.serializeArray();
      const data = {};
      $.each(formData, function() {
          data[this.name] = this.value;
      });

      try {
          const response = await emailjs.send("service_7nx90pd", "template_mq5aj3i", data);

          if (response.status === 200) {
              mensagemDiv.text("Confirmação enviada com sucesso!").css("color", "green");
          } else {
              mensagemDiv.text("Erro ao enviar a confirmação.").css("color", "red");
          }
      } catch (error) {
          console.error("Erro:", error);
          mensagemDiv.text("Erro ao enviar a confirmação.").css("color", "red");
      }
  });
});
