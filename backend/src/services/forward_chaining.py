def combine_cf(cf1, cf2):
    """Combine two certainty factors using CF combination formula"""
    return cf1 + cf2 * (1 - cf1)


def forward_chaining_cf(user_symptoms, rules):
    """
    Forward Chaining dengan Certainty Factor

    user_symptoms : list kode gejala yang dipilih user, e.g. ["G01", "G02"]
    rules         : list rules dengan struktur {gejala, penyakit, cf_pakar}
    
    Returns: dict dengan hasil dan langkah perhitungan
    """
    results = {}  # {penyakit: combined_cf}
    calculation_steps = {}  # {penyakit: [steps]}

    for rule in rules:
        gejala_kode = rule["gejala"]
        penyakit = rule["penyakit"]
        cf_pakar = rule["cf_pakar"]

        # Jika gejala user cocok dengan rule
        if gejala_kode in user_symptoms:
            # Inisialisasi steps jika belum ada
            if penyakit not in calculation_steps:
                calculation_steps[penyakit] = []
            
            if penyakit not in results:
                # CF pertama untuk penyakit ini
                results[penyakit] = cf_pakar
                calculation_steps[penyakit].append({
                    "gejala": gejala_kode,
                    "cf_pakar": cf_pakar,
                    "cf_sebelum": 0,
                    "cf_sesudah": round(cf_pakar, 3),
                    "rumus": f"CF = {cf_pakar}"
                })
            else:
                # Combine CF dengan yang sudah ada
                cf_sebelum = results[penyakit]
                cf_baru = combine_cf(cf_sebelum, cf_pakar)
                results[penyakit] = cf_baru
                calculation_steps[penyakit].append({
                    "gejala": gejala_kode,
                    "cf_pakar": cf_pakar,
                    "cf_sebelum": round(cf_sebelum, 3),
                    "cf_sesudah": round(cf_baru, 3),
                    "rumus": f"CF = {round(cf_sebelum, 3)} + {cf_pakar} × (1 - {round(cf_sebelum, 3)}) = {round(cf_baru, 3)}"
                })

    # Round hasil akhir
    final_results = {}
    for penyakit in results:
        final_results[penyakit] = round(results[penyakit], 3)

    return {
        "hasil": final_results,
        "perhitungan": calculation_steps
    }

