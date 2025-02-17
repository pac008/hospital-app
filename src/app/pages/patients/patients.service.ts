import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Patient } from './patient.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patientSelected$ = new BehaviorSubject<Patient | false>(false)
  patientsFiltered$ = new Subject<Patient[]>()

    patients = [
    {
      patientId:        1,
      name:             'string',
      surname:          'string',
      dateOfBirth:      'string',
      phoneNumber:      'string',
      address:          'string',
      email:            'string',
      emergencyContact: 'string',
      medicalInsurance: 'string',
  }
  ]

  loadPatients = new BehaviorSubject<boolean>(true)
  constructor(private http: HttpClient) {

  }

  getPatients(): Observable<Patient[]> {

    //contruir 3 patients con datos reales, guardar pacientes en patientsFiltered y patients
    this.patientsFiltered$.next(this.patients)
    return of(this.patients)
    return this.http.get<Patient[]>(environment.baseURL + '/patients');
  }

  postPatient(patient: Patient): Observable<Patient> {
    this.patients.push(patient)
    this.patientsFiltered$.next(this.patients)
    return this.http.post<Patient>(environment.baseURL + '/patients', patient)
  }

  deletePatient(id: number): Observable<any> { //borrar el paciente que tenga el mismo id que recibe
    this.patients = this.patients.filter(patient =>
      patient.patientId !== id
    )
    this.patientsFiltered$.next(this.patients)
    return of()
    // return this.http.delete(environment.baseURL + '/patients/'+ id)
  }

  putPatient(newpatient: Patient): Observable<Patient> { //actualizar al paciente que corresponda con el id que se recibe y guardar al paciente
    this.patients = this.patients.map(patientItem =>
      patientItem.patientId === newpatient.patientId ? newpatient : patientItem
    )
    return of()
    // return this.http.put<Patient>(environment.baseURL + '/patients/' + patient.patientId, patient)
  }


}
