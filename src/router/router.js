import {createRouter, createWebHashHistory} from 'vue-router'
import Patients from '../pages/Patients/Patients.vue'
import Invoices from '../pages/Invoices/Invoices.vue'
import Inventory from '../pages/Inventory/Inventory.vue'
import Appointments from '../pages/Appointments/Appointments.vue'
import Wards from '../pages/Wards/Wards.vue'
import AddPatientPage from '../pages/Patients/AddPatientPage.vue'
import AddAppointmentPage from '../pages/Appointments/AddAppointmentPage.vue'
import EditAppointmentPage from '../pages/Appointments/EditAppointment.vue'
import AddInventoryPage from '../pages/Inventory/AddInventoryPage.vue'
import EditInventoryPage from '../pages/Inventory/EditInventoryPage.vue'
import EditPatientPage from '../pages/Patients/EditPatientPage.vue'
import AddInvoicePage from '../pages/Invoices/AddInvoicePage.vue'
import EditInvoicePage from '../pages/Invoices/EditInvoicePage.vue'
import AddWardPage from '../pages/Wards/AddWardPage.vue'
import EditWardPage from '../pages/Wards/EditWardPage.vue'

const routes = [
    {path:'/', redirect:'/patients'},
    {path:'/patients', name:'patients', component: Patients},
    {path:'/invoices', name:'invoices', component: Invoices},
    {path:'/inventory', name:'inventory', component: Inventory},
    {path:'/appointments', name:'appointments', component: Appointments},
    {path:'/wards', name:'wards', component: Wards},
    {path:'/addPatient', name:'addPatient', component: AddPatientPage},
    {path:'/editPatient', name:'editPatient', component: EditPatientPage},
    {path:'/addAppointment', name:'addAppointment', component: AddAppointmentPage},
    {path:'/editAppointment', name:'editAppointment', component: EditAppointmentPage},
    {path:'/addInventory', name:'addInventory', component: AddInventoryPage},
    {path:'/editInventory', name:'editInventory', component: EditInventoryPage},
    {path:'/addInvoice', name:'addInvoice', component: AddInvoicePage},
    {path:'/editInvoice', name:'editInvoice', component: EditInvoicePage},
    {path:'/addWard', name:'addWard', component: AddWardPage},
    {path:'/editWard', name:'editWard', component: EditWardPage},
    




]

  const router = createRouter({
        history: createWebHashHistory('/SistemSpital/'),
        routes
    })

export default router