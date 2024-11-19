// Código JavaScript para el ejercicio de noticias
        // Arreglo para almacenar las noticias
        let noticias = [
            { titulo: 'De la Rúa pasó el área de Internet a Henoch Aguiar', 
                copete: 'Ciencia irá al Ministerio de Educación.', 
                fecha: '2001-24-02', 
                link: 'https://www.lanacion.com.ar/cultura/de-la-rua-paso-el-area-de-internet-a-henoch-aguiar-nid53470/', 
                category: 'politica' },
            { titulo: 'El defensor de la desregulación telefónica',
                copete: 'El secretario de Comunicaciones comenzó a sentir en carne propia las presiones empresariales y políticas por llevar adelante el programa de apertura del sector',
                fecha: '2000-24-07',
                link: 'https://www.lanacion.com.ar/economia/el-defensor-de-la-desregulacion-telefonica-nid26009/',
                category: 'politica' },
            { titulo: 'Aguiar anuló licencias otorgadas por el menemismo',
                copete: 'Son 8 resoluciones de fines del año último',
                fecha: '2000-09-09',
                link: 'https://www.lanacion.com.ar/economia/aguiar-anulo-licencias-otorgadas-por-el-menemismo-nid32174/',
                category: 'politica' },
            { titulo: 'No tengo aliados en el gabinete... porque todos somos una alianza',
                copete: 'El ministro de Infraestructura dice que Henoch Aguiar es un joven impetuoso; afirma que se lleva bien con los hijos del Presidente.',
                fecha: '2021-09-04',
                link: 'https://www.lanacion.com.ar/opinion/no-tengo-aliados-en-el-gabinete-porque-todos-somos-una-alianza-nid211111/',
                category: 'mensiones' },
            { titulo: 'Aguiar quiere competencia en todas las áreas',
                copete: 'Para el secretario de Comunicaciones, el sector puede crecer el 66 por ciento',
                fecha: '2000-05-17',
                link: 'https://www.lanacion.com.ar/economia/aguiar-quiere-competencia-en-todas-las-areas-nid17055/',
                category: 'economia' },
                
        ];

        // Obtener referencias a los elementos del DOM
        const formulario = document.getElementById('formularioNoticias');
        const listaNoticias = document.getElementById('listaNoticias');

        // Función para ordenar las noticias por fecha
        function ordenarNoticiasCronologicamente(noticias) {
            return noticias.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        }

        // Función para mostrar las noticias en la lista
        function mostrarNoticias(noticias) {
            listaNoticias.innerHTML = ''; // Limpiar la lista
            noticias.forEach(noticia => {
                const listItem = document.createElement('li');
                listItem.textContent = `${noticia.fecha}: ${noticia.titulo}`;
                listaNoticias.appendChild(listItem);
            });
        }

        // Manejar el evento de envío del formulario
        formulario.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío del formulario

            // Obtener los valores del formulario
            const titulo = document.getElementById('titulo').value;
            const copete = document.getElementById('copete').value;
            const fecha = document.getElementById('fecha').value;
            const link = document.getElementById('link').value;
            const category = document.getElementById('category').value;
            

            // Agregar la nueva noticia al arreglo
            noticias.push({ titulo, copete, fecha, link, category });

            // Ordenar las noticias cronológicamente
            const noticiasOrdenadas = ordenarNoticiasCronologicamente(noticias);

            // Mostrar las noticias ordenadas
            mostrarNoticias(noticiasOrdenadas);

            // Limpiar los campos del formulario
            formulario.reset();
        });

        function toggleTheme(){
            console.log('dark toggle');
            //get access to body and labels
            const body = document.querySelector("body");
            const labels = document.querySelectorAll("label");
          
            //change the colors
            if (body.style.backgroundColor === "black") {
              body.style.backgroundColor = "white";
              themeButton.innerHTML = "Dark Mode";
              menuIcon.style.color = "rgb(53, 50, 50)";
              for (let i = 0; i < labels.length; i++) {
                labels[i].style.color = "black";
              }
            } else {
              body.style.backgroundColor = "black";
              themeButton.innerHTML = "Light Mode";
              menuIcon.style.color = "white";
              for (let i = 0; i < labels.length; i++) {
                labels[i].style.color = "white";
              }
            }
          }
          
           //event listener for form button
  const submitBtn = document.getElementById('formularioNoticias');
  submitBtn.addEventListener('submit', addMeal);
  
  //event listener for hamburger icon
  const menuIcon = document.querySelector("#menu-icon");
  menuIcon.addEventListener('click', openMenu);
  
  //event listener for dark mode 
  const themeButton = document.querySelector(".theme-btn");
  themeButton.addEventListener('click', toggleTheme);
  
  
