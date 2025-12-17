from src.services.data_loader import load_json

def combine_cf(cf1, cf2):
    return cf1 + cf2 * (1 - cf1)

def forward_chaining_cf(user_gejala: dict):
    rules = load_json("rules.json")
    hasil = {}

    for rule in rules:
        kode_gejala = rule["gejala"]
        penyakit = rule["penyakit"]
        cf_pakar = rule["cf_pakar"]

        if kode_gejala in user_gejala:
            cf_user = user_gejala[kode_gejala]
            cf_rule = cf_user * cf_pakar

            if penyakit not in hasil:
                hasil[penyakit] = cf_rule
            else:
                hasil[penyakit] = combine_cf(
                    hasil[penyakit],
                    cf_rule
                )

    return hasil
