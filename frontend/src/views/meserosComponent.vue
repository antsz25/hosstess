<template>
  <div class="flex min-h-screen">
    <!-- Navbar -->
    <Navbar :class="{blur:mostrandoModal}"/>

    <!-- Contenedor principal -->
    
    <div :class="['flex-grow p-4 relative bg-cover bg-center', { blur: mostrandoModal }]"
      style="background-image: url('https://i.imgur.com/xHIWOer.png');">
      <!-- Encabezado -->
      <div class="absolute inset-0 bg-black opacity-75" @click="cerrarModal"></div>
      <h2 class="text-2xl font-semibold mb-4 z-10 relative text-white">Gestor de Meseros y Mesas</h2>

      <!-- Botón para agregar mesero -->
      <button @click="mostrarModal"
        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 2a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H4a1 1 0 1 1 0-2h6V3a1 1 0 0 1 1-1z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Lista de meseros -->
      <div class="grid grid-cols-3 gap-4 z-10 relative">
        <div v-for="mesero in meseros" :key="mesero.id" class="grid grid-cols-1 bg-white rounded-lg shadow-md p-4 relative">
          <!-- Botón para eliminar -->
          <div class="absolute top-0 right-0 mt-2 mr-2">
            <button @click="eliminarMesero(mesero.celular)"
              class="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M14.707 5.293a1 1 0 0 0-1.414 0L10 8.586 6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0 0-1.414z" clip-rule="evenodd" />
</svg>
            </button>
          </div>
          <!-- Contenido de la tarjeta del mesero -->
          <h3 class="font-semibold text-lg text-red-500">{{ mesero.nombre }}</h3>
          <p class="mt-2 text-base text-gray-700">Edad: {{ mesero.edad }}</p>
          <p class="mt-2 text-base text-gray-700">Fecha de nacimiento: {{ mesero.fecha_nac }}</p>
          <p class="mt-2 text-base text-gray-700">Fecha de ingreso: {{ mesero.fecha_ing }}</p>
          <p class="mt-1 text-base text-gray-700">Celular: {{ mesero.celular }}</p>
          <p v-if="mesero.mesa !== null && mesero.mesa !== 0" class="mt-1 text-base text-gray-700">Mesas: {{ mesero.mesa }}</p>
          <p class="mt-1 text-base text-gray-700">Turno:             
            <span :class="{
              'bg-yellow-500 py-0.5 text-center text-white px-2 rounded': mesero.turno === 'Mañana',
              'bg-orange-500 py-0.5 text-center text-white px-2 rounded': mesero.turno === 'Tarde',
              'bg-gray-900 py-0.5 text-center text-white px-2 rounded': mesero.turno === 'Noche'
            }">{{ mesero.turno }}</span></p>
          <p class="mt-1 text-base text-gray-700">Estado: 
            <span :class="{
              'bg-green-500 py-0.5 text-center text-white px-2 rounded': mesero.estado === 'Disponible',
              'bg-gray-500 py-0.5 text-center text-white px-2 rounded': mesero.estado === 'Descanso',
            }">{{ mesero.estado }}</span>
          </p>
          <button @click="modalasignarMesas(mesero)"
            class="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none">
            Asignar Mesas
          </button>
        </div>
      </div>
    </div>
     <!-- Modal para agregar nuevo mesero -->
     <div v-if="mostrandoModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-8" @click.stop>
        <h3 class="text-lg font-semibold mb-4">Agregar Nuevo Mesero</h3>
        <form @submit.prevent="agregarMesero" class="m-5">
          <input v-model="nuevoMesero.nombre" type="text" class="w-full my-3 px-3 py-2 border rounded-md"
            placeholder="Nombre">
          <input v-model="nuevoMesero.apellido" type="text" class="w-full my-3 px-3 py-2 border rounded-md"
            placeholder="Apellido" />
          <label for = "fecha_nac">Fecha de nacimiento</label>
          <input v-model.date="nuevoMesero.fecha_nac" type="date" class="w-full mb-3 px-3 py-2 border rounded-md"
            placeholder="Fecha de nacimiento" id="fecha_nac">
          <label for = "fecha_ing">Fecha de ingreso</label>
          <input v-model.date="nuevoMesero.fecha_ing" name="fecha_ing" type="date" class="w-full mb-3 px-3 py-2 border rounded-md"
            placeholder="Fecha de nacimiento">
          <input v-model="nuevoMesero.celular" type="text" class="w-full my-3 px-3 py-2 border rounded-md"
            placeholder="Celular">
          <!-- Menú desplegable para seleccionar el turno -->
          <select v-model="nuevoMesero.turno" class="w-full my-3 px-3 py-2 border rounded-md">
            <option value="">Seleccionar Turno</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
          <div class="flex justify-end">
            <button type="submit"
              class="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Agregar</button>
            <button @click="cerrarModal"
              class="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal para asignar mesa -->
    <div v-if="modalAsignarMesa" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-8">
        <h3 class="text-lg font-semibold mb-4">Asignar Mesa</h3>
        <!-- Modal para asignar mesa -->
    <div v-if="modalAsignarMesa" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-8">
        <h3 class="text-lg font-semibold mb-4">Asignar Mesa</h3>
        <p class="text-gray-700 mb-4">Selecciona las mesas a asignar a {{ this.meseroSeleccionado.nombre }}:</p>
        <div @click="toggleDropDown" class="flex justify-between w-full mb-2 px-3 py-2 border rounded-md">
          <span>Selecciona las mesas a asignar</span>
          <i :class="modalAsignarMesaDropDownVisible ? 'arrow-up' : 'arrow-down'"></i>
        </div>
        <div v-if="modalAsignarMesaDropDownVisible" class="overflow-y-auto mb-2 px-3 py-2 border rounded-md">
          <label v-for='mesa in mesasDisponibles' :key="mesa.numero" :value="mesa.numero" class="block cursor-pointer p-1">
              <input
                type="checkbox"
                :value="mesa.numero"
                :id="mesa.numero"
                v-model="modalAsignarMesaSelectedItems"
              />
            {{ mesa.nombre }} (Capacidad: {{ mesa.capacidad }} - ID: {{ mesa.numero }})
          </label>
          
        </div>
        <div class="flex justify-between">
          <button v-if="modalAsignarMesaDropDownVisible" @click="asignarMesas(this.meseroSeleccionado,modalAsignarMesaSelectedItems)"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Asignar</button>
          <button @click="cerrarModalAsignarMesa"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancelar</button>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>



<script>
import { ref } from 'vue';
import Navbar from '../components/Sidebar.vue';
import Axios from '../main.ts';

export default {
  components: {
    Navbar,
  },
  setup() {
    return { 
      meseros: ref([]),
      mesasDisponibles: ref([]),
      nuevoMesero: {
        nombre: '',
        apellido: '',
        celular: null,
        turno: '',
        fecha_ing: null,
        fecha_nac: null,
      },
      mesasSeleccionadas: ref([]),
      meseroSeleccionado: null,
      mostrandoModal: ref(false),
      modalAsignarMesa: ref(false),
      modalAsignarMesaDropDownVisible: ref(false),
      modalAsignarMesaSelectedItems: ref([])
    };
  },
  async mounted(){
    await this.setMeseros();
  },
  methods: {
    handleMouseDown(event) {
      event.preventDefault();
      const select = event.target;
      const option = select.options[select.selectedIndex];
      option.selected = !option.selected;
    },
    async setMeseros(){
      try{
        const result = await Axios.get('waiters/');
        // Helper function to convert text to number if possible
        const convert = (text) => {
          return isNaN(text) ? text : parseInt(text, 10);
        };
        // Helper function to create alphanumeric key
        const alphanumKey = (key) => {
            return key.split(/([0-9]+)/).map(convert);
        };
        const mesas = await Axios.get('/mesas/');
        // Sorting array using the alphanumKey
        mesas.data.sort((a, b) => {
            const keyA = alphanumKey(a.nombre);
            const keyB = alphanumKey(b.nombre);
            for (let i = 0; i < Math.max(keyA.length, keyB.length); i++) {
                if (keyA[i] !== keyB[i]) {
                    if (keyA[i] === undefined) return -1;
                    if (keyB[i] === undefined) return 1;
                    if (typeof keyA[i] === 'number' && typeof keyB[i] === 'number') {
                        return keyA[i] - keyB[i];
                    } else {
                        return keyA[i].toString().localeCompare(keyB[i].toString());
                    }
                }
            }
            return 0;
        });
        this.mesasDisponibles = mesas.data; //Filling data
        let mesero = result.data; //Filling data
        let status = "";
        this.meseros = [];
        mesero.forEach(async element => {
          let turno = "";
          switch(element.workSchedule){
            case "morning":
              turno =  "Mañana";
              break;
            case "afternoon":
              turno = "Tarde";
              break;
            case "evening":
              turno = "Noche";
              break;
          }
          status = await this.calcularEstadoMesero(element);
          console.log(element.birthDate);
          console.log(element.birthDate.split('T').splice(0,1).join('')); 
          this.meseros.push({
            id: element._id,
            nombre: `${element.name} ${element.lastName}`,
            edad: this.getAge(element.birthDate),
            fecha_nac: element.birthDate.split('T').splice(0,1).join(''),
            fecha_ing: element.startDate.split('T').splice(0,1).join(''),
            celular: element.cellphone,
            mesa: element.mesa,
            turno: turno,
            estado: status
          });
        });
      }catch(err){
        console.error(err.message);
      }
    },
    toggleDropDown(){
      this.modalAsignarMesaDropDownVisible = !this.modalAsignarMesaDropDownVisible;
    },
    modalasignarMesas(meseroselec){
      this.meseroSeleccionado = meseroselec;
      this.modalAsignarMesaSelectedItems = [];
      this.mesasDisponibles.forEach(mesa => {
        if(this.meseroSeleccionado.mesa !== null && this.meseroSeleccionado.mesa.includes(mesa.numero)){
          this.modalAsignarMesaSelectedItems.push(mesa.numero);
        }
      });
      this.modalAsignarMesa = true;
    },
    cerrarModalAsignarMesa(){
      this.modalAsignarMesa = false;
      this.meseroSeleccionado = null;
      this.modalAsignarMesaSelectedItems = [];
    },
    getAge(birthDate){
        let today = new Date();
        let birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        var month = today.getMonth() - birth.getMonth();
        if(month <0 || (month === 0 && today.getDate() < birth.getDate())){
          return age --;
        } 
        return age;
    },
    async calcularEstadoMesero(mesero) {
      try{
        const horaActual = new Date().getHours(); // Obtiene la hora actual del sistema
        const turnoInicio = this.obtenerHoraTurno(mesero.workSchedule); // Obtiene la hora de inicio del turno del mesero    
        const turnoFin = turnoInicio + 8; // Se asume que el turno dura 8 horas
        if (horaActual >= turnoInicio && horaActual < turnoFin) {
          await Axios.put(`/waiters/${mesero.cellphone}`,{status:'active'})
          .catch((error)=>{throw new Error("No se puede actualizar el estado a disponible: " + error)});
          return 'Disponible';
        } 
        else if (mesero.status === 'rest' || horaActual === turnoFin || mesero.status === 'active') {
          await Axios.put(`/waiters/${mesero.cellphone}`,{status:'rest'})
          .catch((error)=>{throw new Error("No se puede actualizar el estado a descanso: " + error)});
          return 'Descanso';
        } 
      }catch(err){
        console.error(err.message);
        return;
      }
    },
    mostrarModal() {
      this.mostrandoModal = true;
    },
    cerrarModal() {
      this.mostrandoModal = false;
      this.resetearFormulario();
    },
    resetearFormulario() {
      this.nuevoMesero.nombre = '';
      this.nuevoMesero.edad = null;
      this.nuevoMesero.turno = '';
    },
    async asignarMesas(mesero,mesas){
      try{
        const arrayMesas = mesas.map(mesa => parseInt(mesa));
        let mesasOcupadas =null;
        this.mesasDisponibles.forEach(mesa =>{
            if(arrayMesas.includes(mesa.numero) && mesa.mesero){
              if(mesa.mesero.cellphone !== mesero.celular){
                if(mesasOcupadas){
                  mesasOcupadas += ", " + mesa.numero;
                }
                else{
                  mesasOcupadas = mesa.numero;
                }
              }
            }
        })
        if(mesasOcupadas){
          alert("Las mesas " + mesasOcupadas + " ya tienen un mesero asignado");
          return;
        }
        const updateWasiters = await Axios.put(`/waiters/${mesero.celular}`,{mesa:mesas});
        if(updateWasiters.status === 200){
          let meseroAct = await Axios.get(`/waiters/${mesero.celular}`);
          meseroAct = meseroAct.data;
          this.mesasDisponibles.forEach(async mesa => {
            if(arrayMesas.includes(mesa.numero) && !mesa.mesero){
              let index = arrayMesas.indexOf(mesa.numero);
              const updateTables = await Axios.put(`/mesas/change/${arrayMesas[index]}`,{mesero: meseroAct});
            }
            else if(!mesa.mesero){
              const updateTables = await Axios.put(`/mesas/change/${mesa.numero}`,{mesero: null});
            }
          });
          alert("Mesas asignadas correctamente");
          await this.setMeseros();
          this.cerrarModalAsignarMesa();
        }
      }catch(err){
        await this.setMeseros();
        console.error(err);
      }
    },
    async agregarMesero() {
      console.log(this.nuevoMesero);
      if (this.nuevoMesero.nombre && this.nuevoMesero.apellido && this.nuevoMesero.fecha_nac && this.nuevoMesero.turno && this.nuevoMesero.celular && this.nuevoMesero.fecha_ing) {
        let workSchedule = "";
        switch(this.nuevoMesero.turno){
          case "Mañana":
            workSchedule = "morning";
            break;
          case "Tarde":
            workSchedule = "afternoon";
            break;
          case "Noche":
            workSchedule = "evening";
            break;
        }
        const result = await Axios.post('/waiters/add',{
          name: this.nuevoMesero.nombre,
          lastName: this.nuevoMesero.apellido,
          birthDate: this.nuevoMesero.fecha_nac,
          startDate: this.nuevoMesero.fecha_ing,
          cellphone: this.nuevoMesero.celular,
          workSchedule: workSchedule,
          role: "waiter",
        })
        this.meseros.push({
          nombre: this.nuevoMesero.nombre + " " + this.nuevoMesero.apellido,
          edad: this.getAge(this.nuevoMesero.edad),
          celular: this.nuevoMesero.celular,
          mesa: 0,
          turno: this.nuevoMesero.turno,
          estado: 'Descanso'
        });
        await this.setMeseros();
        this.cerrarModal();
      }
      else {
        alert('Por favor complete todos los campos.');
      }
    },
    async eliminarMesero(id) {
      try{
        if(confirm("¿Estás seguro de eliminar al mesero?"	)){
          const password = prompt("Por favor, ingrese la contraseña de administrador para continuar:");
          if(password !== "1234"){
            alert("Contraseña erronea");
            return;
          }
          else{
            const result = await Axios.delete(`/waiters/${id}`);
            if(result.status == 200){
              const index = this.meseros.indexOf(this.meseros.find(mesero => mesero.celular === id));
              if (index !== -1) {
                let element = this.meseros[index];
                if(element.mesa !== null && element.mesa !== 0){
                  element.mesa.forEach(async mesa => {
                    const updateTables = await Axios.put(`/mesas/change/${mesa}`,{mesero: null});
                  });
                }
                this.meseros.splice(index, 1);
              }
              alert("Mesero eliminado correctamente");
            }
          }
        }
      }catch(err){
        console.error(err.message);
      }
    },
    // Función para obtener la hora de inicio del turno en base al nombre del turno
    obtenerHoraTurno(turno) {
      if(turno != null){
        switch (turno.toLowerCase()) {
          case "morning":
            return 8;
          case "afternoon":
            return 16;
          case "evening":
            return 0;
          default:
            return 0; // Por defecto, se asume turno de noche si no se reconoce el turno
        }
      }
    }
  }
};
</script>
<style scoped>
.arrow-up::before,
.arrow-down::before {
  content: '';
  border: solid black;
  display: inline-block;
  width: 0;
  height: 0;
}

.arrow-up::before {
  border-width: 0 4px 6px 4px;
  border-color: transparent transparent black transparent;
}

.arrow-down::before {
  border-width: 6px 4px 0 4px;
  border-color: black transparent transparent transparent;
}
</style>