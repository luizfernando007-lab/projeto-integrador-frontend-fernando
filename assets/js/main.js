// Desafio Extra: Validação via canPlayType() sem alterar a reprodução
document.addEventListener("DOMContentLoaded", () => {
    const videoTest = document.createElement("video");
    const webmSupport = videoTest.canPlayType('video/webm; codecs="vp9, vorbis"');
    const mp4Support = videoTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    
    const suporteElement = document.querySelector("#suporte-midia small");
    if (suporteElement) {
        suporteElement.textContent = `[Compatibilidade do Navegador] WebM: ${webmSupport || 'no'} | MP4: ${mp4Support || 'no'}`;
    }
});